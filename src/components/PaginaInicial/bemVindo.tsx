import Image from "next/image";
import { Card } from "../ui/card";

export const BemVindo = () => {
  return (
    <Card className="relative w-full h-30 sm:h-50 md:h-70 rounded-md">
      <div className="absolute top-0 left-0">
        <Image
          src="/assets/lapis-icon.png"
          width={100}
          height={100}
          className="sm:w-50 sm:h-20 md:w-80 md:h-25"
          alt="Bem-Vindo"
        />
      </div>

      <div className="flex justify-center items-center h-full px-4">
        <h1 className="text-2xl sm:text-4xl md:text-8xl font-bold text-[#008C35] text-center">
          Bem Vindo
        </h1>
      </div>
    </Card>
  );
};
