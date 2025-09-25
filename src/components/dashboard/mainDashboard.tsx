import { BemVindo } from "../PaginaInicial/bemVindo";
import { GridDashboard } from "./gridDashboard";
import { HeaderDashboard } from "./headerDashboard";

export const MainDashboard = () => {
  return (
    <main className="px-5 pt-10 mx-auto container">
      <BemVindo />
      <GridDashboard />
    </main>
  );
};
