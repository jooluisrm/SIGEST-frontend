import { usePageType } from "@/context/pageTypeContext";
import { IconAvatar } from "../cadastrar/iconAvatar";
import { Card } from "../ui/card";
import Image from "next/image";
import { AppButton } from "../shared/app-button";

export const ItemView = ({ id }: { id: number }) => {
  const { type } = usePageType();

  return (
    <div className="container min-w-full p-0 md:p-4">
      <Card className="border-0 flex flex-col md:flex-row gap-8 md:gap-4 w-full">
        <div className="flex flex-col mt-4 md:mt-10 justify-start items-center md:w-1/3">
          <div className="w-32 h-32 md:w-48 md:h-48 p-4 bg-gray-300 rounded-full flex items-center justify-center">
            <Image
              src={`/assets/aluno-icon.png`}
              alt={`${type} avatar`}
              width={170}
              height={170}
              className="rounded-full w-full h-full object-cover"
              priority={true}
            />
          </div>
          <div className="mt-6 md:mt-10 font-bold text-xl md:text-2xl text-center px-4">Fulano da Silva Soares</div>
          <div className="mt-4 md:mt-10 font-bold text-lg md:text-xl text-center">
            {type === "professor" && <p>Matrícula ADPM: 12345</p>}
            {type != "professor" && <p>Matrícula: 12345</p>}
          </div>

          <AppButton
            type="button"
            intent={"done2"}
            children="Alterar"
            className="px-10 mt-8 md:mt-4 text-xl"
          />
        </div>
        {type === "aluno" && (
          <div className="flex flex-col xl:flex-row w-full md:w-2/3 justify-start xl:justify-between mt-8 md:mt-10 px-4 md:px-10 gap-8 pb-8">
            <div className="w-full xl:w-1/2">
              <p className="mx-2 font-bold mb-4">Disciplinas em Curso:</p>
              <Card className="w-full border-0 space-y-2">
                <div className="w-full bg-gray-200 border border-primaria rounded-md p-3">
                  Geografia
                </div>
                <div className="w-full bg-gray-200 border border-primaria rounded-md p-3">
                  História
                </div>
                <div className="w-full bg-gray-200 border border-primaria rounded-md p-3">
                  Matemática
                </div>
                <div className="w-full bg-gray-200 border border-primaria rounded-md p-3">
                  Português
                </div>
                <div className="w-full bg-gray-200 border border-primaria rounded-md p-3">
                  Ciências
                </div>
              </Card>
            </div>
            <div className="w-full xl:w-1/2">
              <p className="mx-2 font-bold mb-4">Aulas de Hoje</p>
              <Card className="flex flex-row justify-between w-full bg-gray-200 border border-primaria rounded-md py-4 px-2 sm:px-4">
                <div className="mx-4">
                  <p className="mb-3 font-bold">Horário:</p>
                  <div className="flex flex-col gap-2">
                    <p>13:00 - 13:40</p>
                    <p>13:40 - 14:40</p>
                    <p>14:40 - 15:40</p>
                    <p>16:00 - 16:40</p>
                    <p>16:40 - 17:40</p>
                  </div>
                </div>

                <div className="mx-4">
                  <p className="mb-3 font-bold">Disciplina:</p>
                  <div className="flex flex-col gap-2">
                    <p>Português</p>
                    <p>Português</p>
                    <p>Intervalo</p>
                    <p>Matemática</p>
                    <p>Matemática</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
