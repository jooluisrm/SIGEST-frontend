import { AppButton } from "@/components/shared/app-button";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Props = {
    isSubmitting: boolean;
}

export const FormButtons = ({ isSubmitting }: Props) => {

    const { reset } = useFormContext();

    return (
        <>
            <div className="mt-10 flex flex-col gap-2 md:flex-row md:gap-3">
                <AppButton
                    isLoading={isSubmitting}
                    type="submit"
                    intent={"done1"}
                    className="min-w-[120px]"
                >
                    {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span>Cadastrar</span>}
                </AppButton>
                <AppButton
                    isLoading={isSubmitting}
                    type="reset"
                    intent={"cancel"}
                    className="min-w-[120px]"
                    onClick={() => reset()}
                >
                    <span>Cancelar</span>
                </AppButton>
            </div>
        </>
    );
}