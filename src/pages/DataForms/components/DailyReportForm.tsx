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
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/DatePicker";
import {
  useCreateReport,
  useReportByDate,
  useUpdateReport,
} from "@/queries/cryptoQueries";
import { useEffect } from "react";

const dailyReportSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startingNav: z.number().min(0, "Starting NAV must be a positive number"),
  endingNav: z.number().min(0, "Ending NAV must be a positive number"),
  growthRate: z.number(),
  details: z.string().min(1, "Details are required"),
});

export default function DailyReportForm({
  reportDate,
}: {
  reportDate?: string;
}) {
  const form = useForm<z.infer<typeof dailyReportSchema>>({
    resolver: zodResolver(dailyReportSchema),
    defaultValues: {
      date: reportDate || "",
      startingNav: 0,
      endingNav: 0,
      growthRate: 0,
      details: "",
    },
  });

  const { data: reportData } = useReportByDate(reportDate || "");
  const { mutate: createReport, isPending: isCreating } = useCreateReport();
  const { mutate: updateReport, isPending: isUpdating } = useUpdateReport();

  useEffect(() => {
    if (reportData?.data) {
      const { data } = reportData;
      form.reset({
        date: data.date,
        startingNav: parseFloat(data.starting),
        endingNav: parseFloat(data.ending),
        growthRate: parseFloat(data.growthRate),
        details: data.note,
      });
    }
  }, [reportData, form]);

  async function onSubmit(values: z.infer<typeof dailyReportSchema>) {
    const payload = {
      note: values.details,
      starting: values.startingNav.toString(),
      ending: values.endingNav.toString(),
      growthRate: `${values.growthRate}%`,
    };

    if (reportDate && reportData?.data?.id) {
      updateReport(
        { id: reportData.data.id, data: payload },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    } else {
      createReport(payload, {
        onSuccess: () => {
          form.reset();
        },
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-card p-4 rounded-lg"
      >
        <h2 className="text-xl font-semibold">Daily Report</h2>
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker
                  {...field}
                  onChange={(date) => field.onChange(date)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="startingNav"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting NAV</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endingNav"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ending NAV</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="growthRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Growth Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isCreating || isUpdating}>
          {isCreating || isUpdating
            ? "Submitting..."
            : reportDate
            ? "Update Daily Report"
            : "Create Daily Report"}
        </Button>
      </form>
    </FormProvider>
  );
}