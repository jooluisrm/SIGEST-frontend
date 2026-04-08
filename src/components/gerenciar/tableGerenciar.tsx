import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { moduleRegistry } from "@/config/module-registry";
import { usePageType } from "@/context/pageTypeContext";
import { ItemTable } from "./itemTable";

type Props = {
  dataList: unknown[];
  onRefresh?: () => void;
};

export const TableGerenciar = ({ dataList, onRefresh }: Props) => {
  const { type } = usePageType();

  if (!type) {
    return null;
  }

  const registryEntry = moduleRegistry[type];

  return (
    <Table className="bg-white">
      <TableCaption>Lista de {registryEntry.pluralLabel.toLowerCase()}</TableCaption>
      <TableHeader>
        <TableRow>
          {registryEntry.columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataList.map((item) => (
          <ItemTable
            key={`${type}-${registryEntry.getId(item)}`}
            item={item}
            onRefresh={onRefresh}
          />
        ))}
      </TableBody>
    </Table>
  );
};
