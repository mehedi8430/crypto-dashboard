import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAllocationByKey,
  useCreateAllocation,
  useUpdateAllocation,
} from "@/queries/cryptoQueries";
import { useEffect } from "react";

const allocationSchema = z.object({
  key: z.string().min(1, "Allocation is required"),
  name: z.string().min(1, "Allocation name is required"),
  initialBalance: z.coerce.number().min(0, "Value must be a positive number"),
});

export default function AddAllocationForm({
  allocationKey,
  onClose,
}: {
  allocationKey: string | undefined;
  onClose?: () => void;
}) {
  const form = useForm<z.infer<typeof allocationSchema>>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      key: "A",
      name: "",
      initialBalance: 0,
    },
  });

  const createAllocation = useCreateAllocation();
  const updateAllocation = useUpdateAllocation();

  const { data: allocationData } = useAllocationByKey(allocationKey || "");

  useEffect(() => {
    if (allocationData && allocationKey) {
      form.reset({
        key: allocationKey,
        name: allocationData?.data?.name,
        initialBalance: allocationData?.data?.current_balance,
      });
    } else if (!allocationKey) {
      // Reset to default values for new allocations
      form.reset({
        key: "A",
        name: "",
        initialBalance: 0,
      });
    }
  }, [allocationData, form, allocationKey]);

  function onSubmit(values: z.infer<typeof allocationSchema>) {
    console.log("Allocation Form Submitted", values);
    const payload = {
      key: values.key,
      name: values.name,
      initialBalance: values.initialBalance,
    };

    if (allocationKey) {
      updateAllocation.mutate({ key: allocationKey, data: payload });
      onClose?.();
    } else {
      createAllocation.mutate(payload);
      onClose?.();
    }
  }

  const allocationOptions = [
    { value: "A", label: "Allocation A" },
    { value: "B", label: "Allocation B" },
    { value: "C", label: "Allocation C" },
    { value: "D", label: "Allocation D" },
    { value: "E", label: "Allocation E" },
    { value: "F", label: "Allocation F" },
    { value: "G", label: "Allocation G" },
    { value: "H", label: "Allocation H" },
    { value: "I", label: "Allocation I" },
    { value: "J", label: "Allocation J" },
    { value: "K", label: "Allocation K" },
    { value: "L", label: "Allocation L" },
    { value: "M", label: "Allocation M" },
    { value: "N", label: "Allocation N" },
    { value: "O", label: "Allocation O" },
    { value: "P", label: "Allocation P" },
    { value: "Q", label: "Allocation Q" },
    { value: "R", label: "Allocation R" },
    { value: "S", label: "Allocation S" },
    { value: "T", label: "Allocation T" },
    { value: "U", label: "Allocation U" },
    { value: "V", label: "Allocation V" },
    { value: "W", label: "Allocation W" },
    { value: "X", label: "Allocation X" },
    { value: "Y", label: "Allocation Y" },
    { value: "Z", label: "Allocation Z" },
  ];

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-4 rounded-lg"
      >
        {/* Allocation Key */}
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select an allocation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allocationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Allocation Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Initial Balance */}
        <FormField
          control={form.control}
          name="initialBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Balance</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createAllocation.isPending}>
          {allocationKey ? "Update Allocation" : "Create Allocation"}
        </Button>
      </form>
    </FormProvider>
  );
}
