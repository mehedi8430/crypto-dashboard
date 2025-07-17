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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allocationSchema = z.object({
  allocation: z.string().min(1, "Allocation is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  value: z.number().min(0, "Value must be a positive number"),
  timer: z.string().min(1, "Timer is required"),
  lastPayout: z.string().min(1, "Last payout event is required"),
  nextUnlock: z.string().min(1, "Next unlock epoch is required"),
});

export default function AllocationsForm() {
  const form = useForm<z.infer<typeof allocationSchema>>({
    resolver: zodResolver(allocationSchema),
    defaultValues: {
      allocation: "A",
      date: "",
      time: "",
      value: 0,
      timer: "",
      lastPayout: "",
      nextUnlock: "",
    },
  });

  async function onSubmit(values: z.infer<typeof allocationSchema>) {
    console.log("Allocation Form Submitted", values);
    toast.success("Allocation data submitted successfully!");
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Allocations</h2>
        <FormField
          control={form.control}
          name="allocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an allocation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A">Allocation A</SelectItem>
                  <SelectItem value="B">Allocation B</SelectItem>
                  <SelectItem value="C">Allocation C</SelectItem>
                  <SelectItem value="D">Allocation D</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <FormLabel>Timer</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastPayout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Payout Event</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nextUnlock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Unlock Epoch</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update Allocation</Button>
      </form>
    </FormProvider>
  );
}