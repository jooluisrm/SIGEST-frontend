type Props = {
  title: string;
};

export const InicialItem = ({ title }: Props) => {
  return (
    <div className="flex flex-col w-full border-b border-[#008C35]">
      {title != "" && (
        <h1 className="flex justify-center items-center w-full bg-white font-bold h-12 md:h-14 rounded-md text-xl md:text-2xl px-2 md:px-4">
          {title}
        </h1>
      )}

      <div className="flex flex-col my-4 md:my-6 px-2 md:px-6 text-sm md:text-base leading-relaxed md:leading-loose text-justify">
        Os alunos da Turma B se destacaram com muito esforço, dedicação e ótimos
        resultados. Esse desempenho mostra o comprometimento e a vontade de
        aprender de cada um, servindo de inspiração para toda a escola. Estamos
        muito orgulhosos dessa conquista e desejamos que continuem trilhando
        esse caminho de sucesso. Parabéns a todos os alunos da Turma B pelo
        excelente trabalho!
      </div>
    </div>
  );
};
