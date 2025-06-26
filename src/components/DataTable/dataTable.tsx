import {
    type ColumnDef,
    type SortingState,
    // type ColumnFiltersState,
    // type VisibilityState,
    getSortedRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    // type VisibilityState,
    type Table as TableType,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Skeleton
} from "../ui/skeleton"
import React, {
    useState,
    forwardRef,
    useImperativeHandle,
    type ForwardedRef,
} from "react"
import { ScrollArea } from "../ui/scroll-area"
import AppPagination from "../AppPagination"


export interface DataTableHandle<TData> {
    // table: ReturnType<typeof useReactTable<TData>>
    table: TableType<TData>
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
    filterColumn?: string
    page: number
    limit: number
    total: number
    onPageChange: (page: number) => void
    onLimitChange: (limit: number) => void
    actions?: (row: TData) => React.ReactNode
    // columnFilters: ColumnFiltersState
    // setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    // columnVisibility: VisibilityState
    // setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
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
        // columnFilters,
        // setColumnFilters,
        // columnVisibility,
        // setColumnVisibility,
    }: DataTableProps<TData, TValue>,
    ref: ForwardedRef<DataTableHandle<TData>>
) {
    const [sorting, setSorting] = useState<SortingState>([]);
    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            // columnFilters,
            // columnVisibility,
            pagination: {
                pageIndex: page - 1,
                pageSize: limit,
            },
        },
        onSortingChange: setSorting,
        // onColumnFiltersChange: setColumnFilters,
        // onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: Math.ceil(total / limit),
    })

    useImperativeHandle(ref, () => ({ table }), [table])

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
        ))

    return (
        <ScrollArea className="h-[84vh] rounded-md border">
            <div className="h-[84vh] flex flex-col">
                <div className="border-b">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className="text-muted-foreground">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                    {actions && <TableHead className="text-right pr-12">Actions</TableHead>}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {isLoading
                                ? renderSkeleton()
                                : table.getRowModel().rows.length > 0
                                    ? table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                            {actions && (
                                                <TableCell className="text-right flex items-center justify-end">
                                                    {actions(row.original)}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                    : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center text-muted-foreground">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-auto flex items-center justify-between space-x-2 p-4">
                    <div className="text-[#54607A]">
                        Showing {limit <= total ? limit : total} Result from {total} Total Data
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
            </div>
        </ScrollArea>
    )
}

export const DataTable = forwardRef(DataTableInner) as <
    TData,
    TValue = unknown,
>(
    props: DataTableProps<TData, TValue> & { ref?: React.Ref<DataTableHandle<TData>> }
) => ReturnType<typeof DataTableInner>
