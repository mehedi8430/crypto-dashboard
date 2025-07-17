import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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

const systemStatusSchema = z.object({
  tradingEngine: z.string().min(1, "Trading Engine status is required"),
  riskManagement: z.string().min(1, "Risk Management status is required"),
  dataFeeds: z.string().min(1, "Data Feeds status is required"),
  operationalCompliance: z
    .string()
    .min(1, "Operational Compliance status is required"),
});

export default function SystemStatusForm() {
  const form = useForm<z.infer<typeof systemStatusSchema>>({
    resolver: zodResolver(systemStatusSchema),
    defaultValues: {
      tradingEngine: "Operational",
      riskManagement: "Operational",
      dataFeeds: "Operational",
      operationalCompliance: "Operational",
    },
  });

  async function onSubmit(values: z.infer<typeof systemStatusSchema>) {
    console.log("System Status Form Submitted", values);
    toast.success("System status updated successfully!");
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tradingEngine"
            render={({ field }) => (
              <FormItem  className="flex justify-between items-center">
                <FormLabel>Trading Engine</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Down">Down</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="riskManagement"
            render={({ field }) => (
              <FormItem  className="flex justify-between items-center">
                <FormLabel>Risk Management</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Down">Down</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataFeeds"
            render={({ field }) => (
              <FormItem  className="flex justify-between items-center">
                <FormLabel>Data Feeds</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Down">Down</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operationalCompliance"
            render={({ field }) => (
              <FormItem  className="flex justify-between items-center">
                <FormLabel>Operational Compliance</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Operational">Operational</SelectItem>
                    <SelectItem value="Down">Down</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update System Status</Button>
      </form>
    </FormProvider>
  );
}