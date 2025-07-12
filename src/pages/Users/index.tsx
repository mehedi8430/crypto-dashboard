import { useUsers } from "@/queries/userQueries";
import { useTitleStore } from "@/stores/titleStore";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type TUserData = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
};

export default function Users() {
  const { setTitle } = useTitleStore();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const { isPending, data, isError, error } = useUsers({
    page,
    limit,
  });

  useEffect(() => {
    setTitle("User Management");
    return () => setTitle("Dashboard");
  }, [setTitle]);

  const columns: ColumnDef<TUserData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableHiding: true,
      cell: ({ row }) => (
        <p className="text-muted-foreground">{row.original.id}</p>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      enableHiding: true,
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      enableHiding: true,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      enableHiding: true,
      cell: ({ row }) => (
        <p className="text-center">
          {format(new Date(row.original.createdAt), "PPP")}
        </p>
      ),
    },
  ];

  if (isError) return <div>{error.message}</div>;

  return (
    <section className="section-container">
      <div className="flex items-center justify-between px-2">
        <h1 className="text-foreground/80 text-sm md:text-lg">
          Total Users
          <span className="text-foreground text-sm md:text-[20px] font-bold ml-1">
            {data?.meta?.total}
          </span>
        </h1>

        <Button>
          <Plus />
          <span>Add User</span>
        </Button>
      </div>

      <div className="h-[78.5vh] overflow-y-auto">
        <div
          className="
            w-[15.9rem] 
            min-[330px]:w-[16.5rem] 
            min-[340px]:w-[17.1rem] 
            min-[350px]:w-[17.7rem] 
            min-[360px]:w-[18.3rem] 
            min-[370px]:w-[18.9rem] 
            min-[380px]:w-[19.5rem] 
            min-[390px]:w-[20.1rem] 
            min-[400px]:w-[20.7rem] 
            min-[410px]:w-[21.3rem] 
            min-[420px]:w-[21.9rem] 
            min-[430px]:w-[22.5rem] 
            min-[440px]:w-[23.1rem] 
            min-[450px]:w-[23.7rem] 
            min-[460px]:w-[24.3rem] 
            min-[470px]:w-full
          "
        >
          <DataTable<TUserData>
            data={data?.data || []}
            columns={columns}
            isLoading={isPending}
            page={page}
            limit={limit}
            total={data?.meta?.total || 0}
            onPageChange={setPage}
            onLimitChange={setLimit}
            isPagination={true}
          />
        </div>
      </div>
    </section>
  );
}
