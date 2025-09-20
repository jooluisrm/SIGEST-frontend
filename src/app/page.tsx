import { InitialPage } from "@/components/PaginaInicial/initialPage";
import { HeaderPage } from "@/components/shared/headerPage";
import { redirect } from "next/navigation";

const Page = () => {
  return (
    <div>
        <header></header>
      <div className="flex justify-center items-center">
        <InitialPage />
      </div>
    </div>
  );
};

export default Page;
