import { GlobalLayout } from "@/components/layout/global-layout";
import { MainInitialPage } from "@/components/PaginaInicial/mainInitialPage";

const Page = () => {
  return (
    <GlobalLayout>
      <div className="flex justify-center items-center">
        <MainInitialPage />
      </div>
    </GlobalLayout>
  );
};

export default Page;
