import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";

const allocationBreakdownSchema = z.object({
  A_percent: z.number().min(0).max(100),
  B_percent: z.number().min(0).max(100),
  C_percent: z.number().min(0).max(100),
  D_percent: z.number().min(0).max(100),
  auditPac_percent: z.number().min(0).max(100),
});

export default function AllocationBreakdownForm() {
  const form = useForm<z.infer<typeof allocationBreakdownSchema>>({
    resolver: zodResolver(allocationBreakdownSchema),
    defaultValues: {
      A_percent: 30,
      B_percent: 25,
      C_percent: 20,
      D_percent: 15,
      auditPac_percent: 10,
    },
  });

  async function onSubmit(values: z.infer<typeof allocationBreakdownSchema>) {
    console.log("Allocation Breakdown Form Submitted", values);
    toast.success("Allocation breakdown submitted successfully!");
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Allocation Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="A_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation A (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="B_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation B (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="C_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation C (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="D_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allocation D (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auditPac_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audit PAC (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Allocation Breakdown</Button>
      </form>
    </FormProvider>
  );
}