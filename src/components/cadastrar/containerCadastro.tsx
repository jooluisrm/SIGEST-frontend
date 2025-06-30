"use client";

import Image from "next/image";
import { InputCadastro } from "./inputCadastro";

type Props = {
  user: string;
};

export const ContainerCadastro = ({ user }: Props) => {
  return (
    <div className="flex flex-col w-screen h-full bg-white/60 backdrop-blur justify-center">
      <div className="flex bg-primaria h-20 mt-3 items-center justify-center">
        <h1 className="text-4xl text-white">Cadastro {user}</h1>
      </div>
      <div className="flex mt-10 justify-center items-center">
        <div className="w-35 h-35 p-4 bg-gray-300 rounded-full md:w-50 md:h-50">
          <Image
            src={`/assets/${user}-icon.png`}
            alt={`${user} avatar`}
            width={170}
            height={170}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-center mt-10 container mx-auto">
        <form action="POST" className="flex flex-col mx-1 mb-5 gap-4 w-[100%] md:w-[70%]">
          <p className="text-lg font-semibold my-2">Informações Pessoais:</p>
          <div className="flex gap-4">
            <label className="w-full">
              Nome Completo
              <InputCadastro />
            </label>

            <label className="w-full md:w-1/2">
              Data de Nascimento
              <InputCadastro />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="md:w-1/2">
              CPF
              <InputCadastro />
            </label>

            <label className="md:w-1/3">
              RG
              <InputCadastro />
            </label>
            <label className="md:w-1/4">
              Gênero
              <InputCadastro />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 md:w-full">
              Nome do Pai
              <InputCadastro />
            </label>

            <label className="w-1/2 md:w-full">
              Nome da mãe
              <InputCadastro />
            </label>
          </div>
          {user === "professor" && (
            <div className="flex">
              <label className="md:w-1/2">
                Possui alguma deficiência?
                <InputCadastro />
              </label>
            </div>
          )}

          <p className="text-lg font-semibold my-2">Informações de Contato:</p>

          <div className="flex gap-4">
            <label className="w-full">
              Logadouro
              <InputCadastro />
            </label>

            <label className="w-full md:w-1/2">
              Numero
              <InputCadastro />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="w-full md:w-1/2">
              Bairro
              <InputCadastro />
            </label>

            <label className="w-full md:w-1/2">
              Complemento
              <InputCadastro />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="w-full">
              Cidade
              <InputCadastro />
            </label>

            <label className="w-full md:w-1/2">
              Estado
              <InputCadastro />
            </label>
          </div>

          <div className="flex gap-4">
            <label className="w-full">
              Telefone - Responsável
              <InputCadastro />
            </label>

            <label className="w-full">
              Celular - Responsável
              <InputCadastro />
            </label>
          </div>
          <div className="flex">
            <label className="w-1/2">
              E-mail
              <InputCadastro />
            </label>
          </div>

          {user === "professor" && (
            <>
              <p className="text-lg font-semibold my-2">
                Informação Profissional:
              </p>
              <div className="flex">
                <label className="w-1/2">
                  Matrícula ADPM
                  <InputCadastro />
                </label>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
