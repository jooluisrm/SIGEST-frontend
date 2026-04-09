import axios from "axios";
import { toast } from "sonner";
import {
  ApiMeta,
  ApiSuccessResponse,
  NormalizedListResponse,
} from "@/types/api";

const EMPTY_META_KEYS = {
  links: null,
  meta: null,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const hasMeta = (value: unknown): value is { meta: ApiMeta } =>
  isRecord(value) && "meta" in value;

const hasDataArray = <T>(value: unknown): value is { data: T[] } =>
  isRecord(value) && Array.isArray(value.data);

export const getApiMessage = (payload: unknown): string | undefined => {
  if (!isRecord(payload)) {
    return undefined;
  }

  const message = payload.message;
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  const legacyMessage = payload.mensagem;
  if (typeof legacyMessage === "string" && legacyMessage.trim()) {
    return legacyMessage;
  }

  return undefined;
};

export const getValidationMessage = (payload: unknown): string | undefined => {
  if (!isRecord(payload)) {
    return undefined;
  }

  const errors = payload.mensagem;
  if (!isRecord(errors)) {
    return undefined;
  }

  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      return value[0];
    }
  }

  return undefined;
};

export const handleApiError = (
  error: unknown,
  fallbackMessage: string
): never => {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data;
    const message =
      getValidationMessage(payload) ??
      getApiMessage(payload) ??
      fallbackMessage;

    toast.error(message);
    throw error;
  }

  toast.error(fallbackMessage);
  throw error;
};

export const notifyApiSuccess = (
  payload: unknown,
  fallbackMessage: string
) => {
  toast.success(getApiMessage(payload) ?? fallbackMessage);
};

export const extractResponseData = <T>(payload: unknown): T => {
  if (isRecord(payload) && "data" in payload) {
    return payload.data as T;
  }

  return payload as T;
};

export const normalizeListResponse = <T>(
  payload: unknown
): NormalizedListResponse<T> => {
  const defaultResponse: NormalizedListResponse<T> = {
    data: [],
    ...EMPTY_META_KEYS,
    status: true,
    code: 200,
    message: "",
  };

  if (Array.isArray(payload)) {
    return {
      ...defaultResponse,
      data: payload as T[],
    };
  }

  if (!isRecord(payload)) {
    return defaultResponse;
  }

  if ("status" in payload && "code" in payload && "message" in payload) {
    const wrapped = payload as ApiSuccessResponse<unknown>;
    const innerData = wrapped.data;
    const rawPayload = payload as Record<string, unknown>;
    const topLevelLinks =
      "links" in rawPayload
        ? (rawPayload.links as NormalizedListResponse<T>["links"])
        : null;
    const topLevelMeta = hasMeta(payload) ? payload.meta : null;

    if (Array.isArray(innerData)) {
      return {
        ...defaultResponse,
        data: innerData as T[],
        links: topLevelLinks,
        meta: topLevelMeta,
        status: wrapped.status,
        code: wrapped.code,
        message: wrapped.message,
      };
    }

    if (hasDataArray<T>(innerData)) {
      return {
        data: innerData.data,
        links: isRecord(innerData) && "links" in innerData ? (innerData.links as NormalizedListResponse<T>["links"]) : null,
        meta: hasMeta(innerData) ? innerData.meta : null,
        status: wrapped.status,
        code: wrapped.code,
        message: wrapped.message,
      };
    }

    if (innerData === null) {
      return {
        ...defaultResponse,
        status: wrapped.status,
        code: wrapped.code,
        message: wrapped.message,
      };
    }
  }

  if (hasDataArray<T>(payload)) {
    const rawPayload = payload as Record<string, unknown>;
    return {
      data: payload.data,
      links: "links" in rawPayload ? (rawPayload.links as NormalizedListResponse<T>["links"]) : null,
      meta: hasMeta(payload) ? payload.meta : null,
      status: typeof rawPayload.status === "boolean" ? rawPayload.status : true,
      code: typeof rawPayload.code === "number" ? rawPayload.code : 200,
      message: getApiMessage(payload) ?? "",
    };
  }

  return defaultResponse;
};
