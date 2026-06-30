import { notFound } from "next/navigation";
import { ProfessorFrequencyRegisterView } from "@/components/dashboard/ProfessorFrequencyRegisterView";

type Props = {
  params: Promise<{ disciplinaId: string }>;
};

export default async function Page({ params }: Props) {
  const resolved = await params;
  const disciplinaId = Number(resolved.disciplinaId);

  if (!Number.isFinite(disciplinaId)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-5 pt-10 pb-6 min-h-screen">
        <ProfessorFrequencyRegisterView disciplinaId={disciplinaId} />
      </div>
    </main>
  );
}
