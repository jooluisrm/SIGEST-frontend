import { MainGerenciar } from "@/components/gerenciar/mainGerenciar";
import { PageTypeProvider } from "@/context/pageTypeContext";
import { MANAGE_ROUTE_TYPES } from "@/config/modules";
import { PageTypeCentral } from "@/types/routerType";
import { notFound } from "next/navigation";

type ProGerenciarPageProps = {
  params: Promise<{ type: PageTypeCentral }>;
};

const validTypes = MANAGE_ROUTE_TYPES;

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
