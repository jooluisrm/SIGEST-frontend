"use client";

import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import Image from "next/image";

export const HeaderGlobal = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 z-50 w-full">
      <Card className="h-20 rounded-none border-0 bg-[#008B35] p-0 m-0">
        <div
          className={
            "container mx-auto px-5 flex justify-between items-center h-full "
          }
        >
          <div className="flex items-center gap-4">
            <Image src={'/assets/sigest-logo-mini.png'} width={150} height={150} alt="" />
          </div>
          <div className="flex items-center gap-4 pt-1">
            <button
              className="text-white"
              onClick={() => router.push("/login")}
            >
              Acessar o Sistema
            </button>
          </div>
        </div>
      </Card>
    </header>
  );
};
