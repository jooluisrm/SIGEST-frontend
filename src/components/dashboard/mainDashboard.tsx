import { GridDashboard } from "./gridDashboard";
import { HeaderDashboard } from "./headerDashboard";

export const MainDashboard = () => {
    return (
        <main className="space-y-10">
            <HeaderDashboard />
            <GridDashboard />
        </main>
    );
}