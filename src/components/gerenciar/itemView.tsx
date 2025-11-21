import { usePageType } from "@/context/pageTypeContext";
import { IconAvatar } from "../cadastrar/iconAvatar";
import { Card } from "../ui/card";
import Image from "next/image";
import { AppButton } from "../shared/app-button";

export const ItemView = ({ id }: { id: number }) => {
  const { type } = usePageType();

  return (
    <div className="container">
      <Card className="border-0 flex">
        <div className="flex flex-col mt-10 justify-center items-center">
          <div className="w-35 h-35 p-4 bg-gray-300 rounded-full md:w-50 md:h-50">
            <Image
              src={`/assets/aluno-icon.png`}
              alt={`${type} avatar`}
              width={170}
              height={170}
              className="rounded-full w-full h-full"
              priority={true}
            />
          </div>
          <div className="mt-10 font-bold text-2xl">Fulano da Silva Soares</div>
          <div className="mt-10 font-bold text-xl">
            {type === "professor" && <p>Matrícula ADPM: 12345</p>}
            {type != "professor" && <p>Matrícula: 12345</p>}
          </div>

          <AppButton
            type="button"
            intent={"done2"}
            children="Alterar"
            className="px-10 mt-2 text-xl"
          />
        </div>
        {type === "aluno" && (
          <div className="flex w-60vw justify-between m-10">
            <div>
              <p className="mx-2 font-bold">Disciplinas em Curso:</p>
              <Card className="w-100 border-0 mt-5">
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
            <div>
              <p className="mx-2 font-bold">Aulas de Hoje</p>
              <Card className="flex flex-row justify-between w-100 bg-gray-200 border border-primaria rounded-md mt-5">
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
