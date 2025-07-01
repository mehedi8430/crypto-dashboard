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
          <TableCell key={`skeleton-cell-${colIndex}`} className="p-2 sm:p-4">
            <Skeleton className="h-4 sm:h-6 w-full" />
          </TableCell>
        ))}
        {actions && (
          <TableCell className="text-right flex items-center justify-end p-2 sm:p-4">
            <Skeleton className="h-4 sm:h-6 w-12 sm:w-16" />
          </TableCell>
        )}
      </TableRow>
    ));

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Table Container with Horizontal Scroll */}
      <div className="w-full">
        <ScrollArea className="w-full">
          <div className="min-w-full overflow-x-auto">
            <Table className="min-w-[600px] sm:min-w-[700px] border-separate border-spacing-y-1 sm:border-spacing-y-2">
              <TableHeader className="[&_tr]:border-b-0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header, i) => (
                      <TableHead
                        key={i}
                        className={`
                          text-muted-foreground text-xs sm:text-sm
                          min-w-[80px] sm:min-w-[120px]
                          px-2 sm:px-4 py-2 sm:py-3
                          ${!actions && headerGroup.headers.length - 1 === i ? "text-center" : ""}
                        `}
                        style={{ width: header.column.getSize() }}
                      >
                        <div className="truncate">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </TableHead>
                    ))}
                    {actions && (
                      <TableHead className="text-muted-foreground text-center text-xs sm:text-sm min-w-[80px] sm:min-w-[120px] px-2 sm:px-4 py-2 sm:py-3">
                        <div className="truncate">Actions</div>
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
                      className="border-0 bg-muted/50 hover:bg-muted my-1 sm:my-2 rounded-md"
                    >
                      {row.getVisibleCells().map((cell, i) => (
                        <TableCell
                          key={i}
                          style={{ width: cell.column.getSize() }}
                          className={`
                            min-w-[80px] sm:min-w-[120px]
                            px-2 sm:px-4 py-2 sm:py-3
                            text-xs sm:text-sm
                            ${i === 0 ? "rounded-l-lg sm:rounded-l-2xl" : ""}
                            ${row.getVisibleCells().length - 1 === i && !actions
                              ? "rounded-r-lg sm:rounded-r-2xl"
                              : ""
                            }
                          `}
                        >
                          <div className="truncate">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        </TableCell>
                      ))}
                      {actions && (
                        <TableCell className="rounded-r-lg sm:rounded-r-2xl min-w-[80px] sm:min-w-[120px] px-2 sm:px-4 py-2 sm:py-3">
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
                      className="h-16 sm:h-24 text-center text-muted-foreground text-xs sm:text-sm px-2 sm:px-4 py-4 sm:py-6"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>

      {/* Pagination Section */}
      {isPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-2 sm:px-4">
          <div className="text-[#54607A] text-xs sm:text-sm text-center sm:text-left order-2 sm:order-1">
            <span className="block sm:inline">
              Showing {limit <= total ? limit : total} Results
            </span>
            <span className="block sm:inline sm:ml-1">
              from {total} Total
            </span>
          </div>
          <div className="order-1 sm:order-2">
            <AppPagination
              total={total}
              limit={limit}
              page={page}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </div>
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
