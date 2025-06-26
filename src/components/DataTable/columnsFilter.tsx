/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, Columns3 } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import type { DataTableHandle } from "./dataTable";
import { useEffect, useState } from "react";
import type { Table } from "@tanstack/react-table";

export default function ColumnsFilter({ tableRef }: { tableRef: React.RefObject<DataTableHandle<any> | null> }) {
  const [table, setTable] = useState<Table<any> | null>(null);

  useEffect(() => {
    if (tableRef.current?.table) {
      setTable(tableRef.current.table);
    }
  }, [tableRef]);

  if (!table) return null;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Columns3 />
            Columns
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
