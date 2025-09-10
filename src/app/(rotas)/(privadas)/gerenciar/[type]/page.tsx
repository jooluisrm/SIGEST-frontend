import { MainGerenciar } from "@/components/gerenciar/mainGerenciar";
import { PageType, PageTypeProvider } from "@/context/pageTypeContext";
import { notFound } from "next/navigation";

type ProGerenciarPageProps = {
  params: Promise<{ type: PageType }>;
};

const validTypes: PageType[] = ["aluno", "professor", "servidor"];

const Page = async ({ params }: ProGerenciarPageProps) => {
  const resolvedParams = await params;
  const { type } = resolvedParams;

  if (!validTypes.includes(type)) {
    notFound();
  }

  return (
    <PageTypeProvider initialType={type}>
      <section className="min-h-screen">
        <MainGerenciar />
      </section>
    </PageTypeProvider>
  );
};

export default Page;
