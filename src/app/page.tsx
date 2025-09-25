"use client";

import { MainInitialPage } from "@/components/PaginaInicial/mainInitialPage";
import { LogoFundo } from "@/components/shared/logo-fundo";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <header className="fixed h-20 rounded-none border-0 bg-primaria p-0 m-0 top-0 z-50 w-full">
        <div
          className={
            "container mx-auto px-5 flex justify-between items-center h-full"
          }
        >
          <div>
            <Image
              src={"/assets/sigest-logo-mini.png"}
              width={200}
              height={200}
              alt=""

            />
          </div>
          <div className="flex items-center pt-1">
            <button
              className="text-white cursor-pointer hover:underline"
              onClick={() => router.push("/login")}
            >
              Acessar o Sistema
            </button>
          </div>
        </div>
      </header>
      <div>
        <main className="mt-20">
          <LogoFundo />
          <div className="bg-white/70 min-h-screen pb-20">
            <div className="container flex justify-center items-center mx-auto px-5 ">
              <MainInitialPage />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
