import { BemVindo } from "./bemVindo";
import { InicialItem } from "./inicialItem";

export const MainInitialPage = () => {
  return (
    <div className="flex justify-center items-center flex-col my-10 gap-12 w-full">
      <BemVindo />
      <InicialItem title="Todas as Notícias" />
      <InicialItem title="Alunos destaque turma B" />
      <InicialItem title="" />
    </div>
  );
};
