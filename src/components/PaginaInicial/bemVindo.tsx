import { Card } from "../ui/card";
import { LapisBemVindo } from "./lapisBemVindo";

export const BemVindo = () => {
  return (
    <Card className="relative w-full h-30 sm:h-50 md:h-70 rounded-md">
      <div className="absolute top-0 left-0">
        <LapisBemVindo />
      </div>

      <div className="flex justify-center items-center h-full px-4">
        <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold text-[#008C35] text-center">
          Bem Vindo
        </h1>
      </div>
    </Card>
  );
};
