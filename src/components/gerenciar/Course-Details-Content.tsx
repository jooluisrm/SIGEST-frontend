import { Course } from "@/types/course";
import { Period } from "@/types/period";
import { CoursePeriodPanel } from "./CoursePeriodPanel";

const formatHours = (value?: number | null) =>
  typeof value === "number" ? `${value}h` : "-";

const getCoursePeriodLabel = (course: Course) =>
  course.periodo_letivo ??
  course.periodoLetivo ??
  course.current_period?.name ??
  course.currentPeriod?.name ??
  "-";

export const CourseDetailsContent = ({
  course,
  periods,
}: {
  course: Course;
  periods: Period[];
}) => (
  <div className="space-y-10 px-1">
    <section>
      <h2 className="mb-4 text-2xl font-bold">Informações do Curso</h2>
      <div className="grid gap-x-6 gap-y-7 md:grid-cols-2">
        <ReadOnlyField label="Nome do Curso" value={course.name} />
        <ReadOnlyField
          label="Quantidade de Séries?"
          value={String(course.number_periods)}
        />
        <ReadOnlyField
          label="Carga Horária Total"
          value={formatHours(course.total_hours)}
        />
        <ReadOnlyField
          label="Carga Horária por Série"
          value={formatHours(course.hours_period)}
        />
        <ReadOnlyField label="Período Letivo" value={getCoursePeriodLabel(course)} />
        <div className="md:col-span-2">
          <label className="mb-2 block text-base text-foreground/80">
            Informações Complementares
          </label>
          <textarea
            readOnly
            value={course.details ??""}
            placeholder="Aqui vão estar descritas as informações complementares relacionadas ao curso"
            className="min-h-[180px] w-full resize-none rounded-lg border-2 border-primaria bg-muted/30 px-3 py-3 text-base text-muted-foreground outline-none"
          />
        </div>
      </div>
    </section>

    <section>
      <h2 className="mb-6 text-2xl font-bold">Períodos Gerados</h2>
      {periods.length ? (
        <div className="space-y-5">
          {periods.map((period) => (
            <CoursePeriodPanel key={period.id} period={period} />
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-border p-4 text-sm text-muted-foreground">
          Nenhum período gerado para este curso.
        </div>
      )}
    </section>
  </div>
);

const ReadOnlyField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="mb-2 block text-base text-foreground/80">{label}</label>
    <input
      readOnly
      value={value}
      className="h-10 w-full rounded-lg border-2 border-primaria bg-muted/30 px-3 text-base text-muted-foreground outline-none"
    />
  </div>
);