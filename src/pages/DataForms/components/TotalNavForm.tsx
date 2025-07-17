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

const totalNavSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  value: z.number().min(0, "Value must be a positive number"),
  timer: z.string().min(1, "Timer is required"),
});

export default function TotalNavForm() {
  const form = useForm<z.infer<typeof totalNavSchema>>({
    resolver: zodResolver(totalNavSchema),
    defaultValues: {
      date: "",
      time: "",
      value: 0,
      timer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof totalNavSchema>) {
    console.log("Total NAV Form Submitted", values);
    toast.success("Total NAV data submitted successfully!");
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Total NAV</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
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
            name="timer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timer (e.g., 5m, 1h)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Total NAV</Button>
      </form>
    </FormProvider>
  );
}