/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { database } from '@/Firebase/Firebase';
import { ref, push, set, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';


// --- Zod Validation Schemas ---
const navChartDataSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  nav: z.number({ required_error: "NAV is required" }).positive('NAV must be positive'),
});

const balanceChartDataSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  balance: z.number({ required_error: "Balance is required" }).positive('Balance must be positive'),
});

const dailyPerformanceHistorySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  balance: z.number({ required_error: "Balance is required" }),
  dailyChange: z.number({ required_error: "Field is required" }),
  percentChange: z.number({ required_error: "Field is required" }),
  notes: z.string().optional(),
});

const allocationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  startingBalance: z.number({ required_error: "Field is required" }),
  dailyGain: z.number({ required_error: "Field is required" }),
  dailyGainPercent: z.number({ required_error: "Field is required" }),
  endingBalance: z.number({ required_error: "Field is required" }),
  notes: z.string().optional(),
  chartData: z.array(balanceChartDataSchema),
  dailyPerformanceHistory: z.array(dailyPerformanceHistorySchema),
  lastPayout: z.string().optional(),
  nextUnlock: z.string().optional(),
});

const assetPerformanceSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  open: z.number({ required_error: "Field is required" }),
  close: z.number({ required_error: "Field is required" }),
  changePercent: z.number({ required_error: "Field is required" }),
  volumeUsd: z.number({ required_error: "Field is required" }),
});

const formSchema = z.object({
  reportDate: z.string().min(1, "Report date is required"),
  nav: z.object({
    startingNav: z.number({ required_error: "Field is required" }),
    endingNav: z.number({ required_error: "Field is required" }),
    growthPercent: z.number({ required_error: "Field is required" }),
    chartData: z.array(navChartDataSchema),
  }),
  allocationBreakdown: z.object({
    A_percent: z.number({ required_error: "Field is required" }),
    B_percent: z.number({ required_error: "Field is required" }),
    C_percent: z.number({ required_error: "Field is required" }),
    auditPac_percent: z.number({ required_error: "Field is required" }),
  }),
  allocations: z.object({
    A: allocationSchema,
    B: allocationSchema,
    C: allocationSchema,
  }),
  assetPerformance: z.object({
    ETH: assetPerformanceSchema,
    BTC: assetPerformanceSchema,
    TUSD: assetPerformanceSchema,
    USDT: assetPerformanceSchema,
    DAI: assetPerformanceSchema,
    SUSD: assetPerformanceSchema,
  }),
  systemStatus: z.object({
    tradingEngine: z.boolean(),
    dataFeeds: z.boolean(),
    riskManagement: z.boolean(),
    compliance: z.boolean(),
    lastSyncSuccess: z.boolean(),
  }),
  visualFlags: z.object({
    tradingEngine: z.string().min(1, "Flag is required"),
    dataFeeds: z.string().min(1, "Flag is required"),
    riskManagement: z.string().min(1, "Flag is required"),
    compliance: z.string().min(1, "Flag is required"),
    systemSync: z.string().min(1, "Flag is required"),
  }),
  teamNotes: z.object({
    devStatus: z.string().optional(),
    developer: z.string().optional(),
    expectedPreview: z.string().optional(),
    dataEntryMode: z.string().optional(),
  }),
  dailyReportText: z.string().optional(),
});


// --- Main React Component ---
export default function DataForms() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || undefined
  });

  useEffect(() => {
    document.title = 'Create New Vault Report';
    const reportsRef = ref(database, 'vaultReports');
    const lastReportQuery = query(reportsRef, orderByChild('generatedDate'), limitToLast(1));

    const unsubscribe = onValue(lastReportQuery, (snapshot) => {
      if (snapshot.exists()) {
        const reports = snapshot.val();
        const lastReportKey = Object.keys(reports)[0];
        const lastReport = reports[lastReportKey];
        // Prepare data for the form
        const formData = {
            ...lastReport,
            reportDate: new Date(lastReport.reportDate).toISOString().split('T')[0],
        };
        setInitialData(formData);
        form.reset(formData); // Reset form with the latest data
      }
    }, (error) => {
      console.error("Error fetching last report:", error);
      toast.error("Failed to fetch latest report data.");
    });

    return () => {
      unsubscribe();
      document.title = 'Dashboard';
    };
  }, [form]); // form dependency to reset the form when data is fetched

  const { fields: navChartFields, append: appendNavChart, remove: removeNavChart } = useFieldArray({ control: form.control, name: "nav.chartData" });
  const { fields: allocAChartFields, append: appendAllocAChart, remove: removeAllocAChart } = useFieldArray({ control: form.control, name: "allocations.A.chartData" });
  const { fields: allocBChartFields, append: appendAllocBChart, remove: removeAllocBChart } = useFieldArray({ control: form.control, name: "allocations.B.chartData" });
  const { fields: allocCChartFields, append: appendAllocCChart, remove: removeAllocCChart } = useFieldArray({ control: form.control, name: "allocations.C.chartData" });
  const { fields: allocADailyFields, append: appendAllocADaily, remove: removeAllocADaily } = useFieldArray({ control: form.control, name: "allocations.A.dailyPerformanceHistory" });
  const { fields: allocBDailyFields, append: appendAllocBDaily, remove: removeAllocBDaily } = useFieldArray({ control: form.control, name: "allocations.B.dailyPerformanceHistory" });
  const { fields: allocCDailyFields, append: appendAllocCDaily, remove: removeAllocCDaily } = useFieldArray({ control: form.control, name: "allocations.C.dailyPerformanceHistory" });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const reportsRef = ref(database, 'vaultReports');
      const newReportRef = push(reportsRef);

      const now = new Date();
      const submissionData = {
        ...values,
        generatedDate: now.toISOString().split('T')[0],
        generatedTime: now.toTimeString().split(' ')[0],
        lastUpdatedDate: now.toISOString().split('T')[0],
        lastUpdatedTime: now.toTimeString().split(' ')[0],
        id: newReportRef.key,
      };

      await set(newReportRef, submissionData);

      toast.success('Report submitted successfully!')
      form.reset();
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      console.error("Firebase submission error:", errorMessage);
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false);
    }
  }

  const renderChartDataFields = (fields: Record<"id", string>[], removeFn: (i: number) => void, appendFn: (d: any) => void, namePrefix: string, valueKey: 'nav' | 'balance') => (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
          <Controller control={form.control} name={`${namePrefix}.${index}.date` as any} render={({ field }) => <Input type="date" {...field} />} />
          <Controller control={form.control} name={`${namePrefix}.${index}.time` as any} render={({ field }) => <Input type="time" {...field} />} />
          <Controller control={form.control} name={`${namePrefix}.${index}.${valueKey}` as any} render={({ field }) => <Input type="number" placeholder="Value" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />} />
          <Button type="button" onClick={() => removeFn(index)} className="bg-destructive hover:bg-destructive/90 h-10">Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={() => appendFn({ date: '', time: '', [valueKey]: 0 })} className="text-sm">Add Data Point</Button>
    </div>
  );

  const renderDailyPerformanceFields = (fields: Record<"id", string>[], removeFn: (i: number) => void, appendFn: (d: any) => void, namePrefix: string) => (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
          <Controller control={form.control} name={`${namePrefix}.${index}.date` as any} render={({ field }) => <Input type="date" {...field} />} />
          <Controller control={form.control} name={`${namePrefix}.${index}.balance` as any} render={({ field }) => <Input type="number" placeholder="Balance" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />} />
          <Controller control={form.control} name={`${namePrefix}.${index}.dailyChange` as any} render={({ field }) => <Input type="number" placeholder="Daily Change" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />} />
          <Controller control={form.control} name={`${namePrefix}.${index}.percentChange` as any} render={({ field }) => <Input type="number" placeholder="% Change" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} />} />
          <Button type="button" onClick={() => removeFn(index)} className="bg-destructive hover:bg-destructive/90 h-10">Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={() => appendFn({ date: '', balance: 0, dailyChange: 0, percentChange: 0, notes: '-' })} className="text-sm">Add Daily Record</Button>
    </div>
  );

  if (!initialData) {
      return (
          <div className="flex justify-center items-center h-screen">
              <div>Loading...</div>
          </div>
      )
  }

  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Vault Report</h1>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            <div className="bg-card p-4 rounded-lg">
              <Controller control={form.control} name="reportDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage>{form.formState.errors.reportDate?.message}</FormMessage>
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-card p-4 rounded-lg space-y-4">
                  <h3 className="font-bold text-lg">Total NAV</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Controller control={form.control} name="nav.startingNav" render={({ field }) => <FormItem><FormLabel>Starting NAV</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.nav?.startingNav?.message}</FormMessage></FormItem>} />
                    <Controller control={form.control} name="nav.endingNav" render={({ field }) => <FormItem><FormLabel>Ending NAV</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.nav?.endingNav?.message}</FormMessage></FormItem>} />
                    <Controller control={form.control} name="nav.growthPercent" render={({ field }) => <FormItem><FormLabel>Growth %</FormLabel><FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.nav?.growthPercent?.message}</FormMessage></FormItem>} />
                  </div>
                  <h4 className="font-semibold pt-4 border-t border-border">NAV Chart Data</h4>
                  {renderChartDataFields(navChartFields, removeNavChart, appendNavChart, "nav.chartData", "nav")}
                </div>

                <div className="bg-card p-4 rounded-lg space-y-4">
                  <h3 className="font-bold text-lg">Asset Performance Panel</h3>
                  <div className="space-y-3">
                    {(Object.keys(form.getValues().assetPerformance) as Array<keyof z.infer<typeof formSchema>["assetPerformance"]>).map((key) => {
                      type AssetKey = keyof z.infer<typeof formSchema>["assetPerformance"];
                      const assetErrors = form.formState.errors.assetPerformance?.[key as AssetKey];
                      return (
                        <div key={key}>
                          <h4 className="font-semibold text-primary">{key}</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-1">
                            <Controller control={form.control} name={`assetPerformance.${key}.open` as any} render={({ field }) => <FormItem><FormLabel>Open</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{assetErrors?.open?.message}</FormMessage></FormItem>} />
                            <Controller control={form.control} name={`assetPerformance.${key}.close` as any} render={({ field }) => <FormItem><FormLabel>Close</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{assetErrors?.close?.message}</FormMessage></FormItem>} />
                            <Controller control={form.control} name={`assetPerformance.${key}.changePercent` as any} render={({ field }) => <FormItem><FormLabel>Change %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{assetErrors?.changePercent?.message}</FormMessage></FormItem>} />
                            <Controller control={form.control} name={`assetPerformance.${key}.volumeUsd` as any} render={({ field }) => <FormItem><FormLabel>Volume USD</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{assetErrors?.volumeUsd?.message}</FormMessage></FormItem>} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-card p-4 rounded-lg space-y-4">
                  <h3 className="font-bold text-lg">Allocation Breakdown</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller control={form.control} name="allocationBreakdown.A_percent" render={({ field }) => <FormItem><FormLabel>Allocation A %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocationBreakdown?.A_percent?.message}</FormMessage></FormItem>} />
                    <Controller control={form.control} name="allocationBreakdown.B_percent" render={({ field }) => <FormItem><FormLabel>Allocation B %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocationBreakdown?.B_percent?.message}</FormMessage></FormItem>} />
                    <Controller control={form.control} name="allocationBreakdown.C_percent" render={({ field }) => <FormItem><FormLabel>Allocation C %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocationBreakdown?.C_percent?.message}</FormMessage></FormItem>} />
                    <Controller control={form.control} name="allocationBreakdown.auditPac_percent" render={({ field }) => <FormItem><FormLabel>Audit PAC %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocationBreakdown?.auditPac_percent?.message}</FormMessage></FormItem>} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 rounded-lg space-y-6">
              <h3 className="font-bold text-lg">Allocations</h3>
              <div className="grid grid-cols-1 gap-6">
                {(Object.keys(form.getValues().allocations) as Array<keyof z.infer<typeof formSchema>["allocations"]>).map((key) => (
                  <div key={key} className="bg-accent/50 p-4 rounded-lg space-y-4">
                    <h4 className="font-bold text-primary">{form.getValues().allocations[key].name}</h4>
                    <Controller control={form.control} name={`allocations.${key}.notes`} render={({ field }) => <FormItem><FormLabel>Notes</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage>{form.formState.errors.allocations?.[key]?.notes?.message}</FormMessage></FormItem>} />
                    <div className="grid grid-cols-2 gap-4">
                      <Controller control={form.control} name={`allocations.${key}.startingBalance`} render={({ field }) => <FormItem><FormLabel>Start Balance</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocations?.[key]?.startingBalance?.message}</FormMessage></FormItem>} />
                      <Controller control={form.control} name={`allocations.${key}.endingBalance`} render={({ field }) => <FormItem><FormLabel>End Balance</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocations?.[key]?.endingBalance?.message}</FormMessage></FormItem>} />
                      <Controller control={form.control} name={`allocations.${key}.dailyGain`} render={({ field }) => <FormItem><FormLabel>Daily Gain</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocations?.[key]?.dailyGain?.message}</FormMessage></FormItem>} />
                      <Controller control={form.control} name={`allocations.${key}.dailyGainPercent`} render={({ field }) => <FormItem><FormLabel>Daily Gain %</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage>{form.formState.errors.allocations?.[key]?.dailyGainPercent?.message}</FormMessage></FormItem>} />
                      <Controller control={form.control} name={`allocations.${key}.lastPayout`} render={({ field }) => <FormItem><FormLabel>Last Payout</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl></FormItem>} />
                      <Controller control={form.control} name={`allocations.${key}.nextUnlock`} render={({ field }) => <FormItem><FormLabel>Next Unlock</FormLabel><FormControl><Input type="datetime-local" {...field} /></FormControl></FormItem>} />
                    </div>
                    <h5 className="font-semibold pt-4 border-t border-border">Chart Data</h5>
                    {key === 'A' && renderChartDataFields(allocAChartFields, removeAllocAChart, appendAllocAChart, "allocations.A.chartData", "balance")}
                    {key === 'B' && renderChartDataFields(allocBChartFields, removeAllocBChart, appendAllocBChart, "allocations.B.chartData", "balance")}
                    {key === 'C' && renderChartDataFields(allocCChartFields, removeAllocCChart, appendAllocCChart, "allocations.C.chartData", "balance")}

                    <h5 className="font-semibold pt-4 border-t border-border">Daily Performance History</h5>
                    {key === 'A' && renderDailyPerformanceFields(allocADailyFields, removeAllocADaily, appendAllocADaily, "allocations.A.dailyPerformanceHistory")}
                    {key === 'B' && renderDailyPerformanceFields(allocBDailyFields, removeAllocBDaily, appendAllocBDaily, "allocations.B.dailyPerformanceHistory")}
                    {key === 'C' && renderDailyPerformanceFields(allocCDailyFields, removeAllocCDaily, appendAllocCDaily, "allocations.C.dailyPerformanceHistory")}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-4 rounded-lg space-y-4">
              <h3 className="font-bold text-lg">Daily Report Text</h3>
              <Controller control={form.control} name="dailyReportText" render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Report Summary</FormLabel>
                  <FormControl><Textarea {...field} rows={4} /></FormControl>
                  <FormMessage>{form.formState.errors.dailyReportText?.message}</FormMessage>
                </FormItem>
              )} />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-lg"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vault Report'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}