import {
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  type Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
} from "react";
import { ScrollArea } from "../ui/scroll-area";
import AppPagination from "../AppPagination";

export interface DataTableHandle<TData> {
  table: TableType<TData>;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filterColumn?: string;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  actions?: (row: TData) => React.ReactNode;
  isPagination?: boolean;
}

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    isLoading = false,
    page,
    limit,
    total,
    onPageChange,
    actions,
    isPagination = true,
  }: DataTableProps<TData, TValue>,
  ref: ForwardedRef<DataTableHandle<TData>>
) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: page - 1,
        pageSize: limit,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / limit),
  });

  useImperativeHandle(ref, () => ({ table }), [table]);

  const renderSkeleton = () =>
    [...Array(limit)].map((_, rowIndex) => (
      <TableRow key={`skeleton-${rowIndex}`}>
        {columns.map((_, colIndex) => (
          <TableCell key={`skeleton-cell-${colIndex}`}>
            <Skeleton className="h-6 w-full" />
          </TableCell>
        ))}
        {actions && (
          <TableCell className="text-right flex items-center justify-end">
            <Skeleton className="h-6 w-16" />
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <ScrollArea>
      <div className="flex flex-col overflow-x-scroll md:overflow-hidden">
        <div className="rounded-md">
          <Table className="border-separate border-spacing-y-2">
            <TableHeader className="[&_tr]:border-b-0 w-auto">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header, i) => (
                    <TableHead
                      key={i}
                      className={`
                                                text-muted-foreground
                                                ${
                                                  !actions &&
                                                  headerGroup.headers.length -
                                                    1 ===
                                                    i
                                                    ? "text-center"
                                                    : ""
                                                }
                                            `}
                      style={{ width: header.column.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                  {actions && (
                    <TableHead className="text-muted-foreground text-center">
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                renderSkeleton()
              ) : table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className=" border-0 bg-muted/50 hover:bg-muted my-6 rounded-md"
                  >
                    {row.getVisibleCells().map((cell, i) => (
                      <TableCell
                        key={i}
                        style={{ width: cell.column.getSize() }}
                        className={`
                                                        ${
                                                          i === 0
                                                            ? "rounded-l-2xl"
                                                            : ""
                                                        }
                                                        ${
                                                          row.getVisibleCells()
                                                            .length -
                                                            1 ===
                                                            i && !actions
                                                            ? "rounded-r-2xl"
                                                            : ""
                                                        }
                                                    `}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell className="rounded-r-2xl">
                        <div className="flex justify-center">
                          {actions(row.original)}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {isPagination ? (
          <div className="mt-auto flex items-center justify-between space-x-2 py-4">
            <div className="text-[#54607A]">
              Showing {limit <= total ? limit : total} Result from {total} Total
              Data
            </div>
            <div>
              <AppPagination
                total={total}
                limit={limit}
                page={page}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </ScrollArea>
  );
}

export const DataTable = forwardRef(DataTableInner) as <
  TData,
  TValue = unknown
>(
  props: DataTableProps<TData, TValue> & {
    ref?: React.Ref<DataTableHandle<TData>>;
  }
) => ReturnType<typeof DataTableInner>;
