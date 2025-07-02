/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { database } from '@/Firebase/Firebase';
import { ref, push, set } from 'firebase/database';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
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

const mockData = [
  {
    "generatedDate": "2025-07-02",
    "generatedTime": "03:06:00Z",
    "data": [
      {
        "nav": {
          "startingNav": 3156789,
          "endingNav": 3500000,
          "growthPercent": 0.17,
          "chartData": [
            { "date": "2025-06-16", "time": "09:00:00.000Z", "nav": 3150000 },
            { "date": "2025-06-17", "time": "09:00:00.000Z", "nav": 3200000 },
            { "date": "2025-06-18", "time": "09:00:00.000Z", "nav": 3180000 },
            { "date": "2025-06-19", "time": "09:00:00.000Z", "nav": 3250000 },
            { "date": "2025-06-20", "time": "09:00:00.000Z", "nav": 3300000 },
            { "date": "2025-06-21", "time": "09:00:00.000Z", "nav": 3400000 },
            { "date": "2025-06-22", "time": "09:00:00.000Z", "nav": 3500000 }
          ]
        },
        "allocationBreakdown": {
          "A_percent": 41.5,
          "B_percent": 35.1,
          "C_percent": 26.5,
          "auditPac_percent": 90
        },
        "allocations": {
          "A": {
            "name": "Allocation A: Core Holdings",
            "startingBalance": 1337420.30,
            "dailyGain": 3088.08,
            "dailyGainPercent": 0.23,
            "endingBalance": 1337420.30,
            "notes": "Band Assignment: Expansion, Routing Strategy: Dynamic, Override Status: Inactive. Last Payout: 06/17/2025, 09:15 AM. Next Unlock: 07/20/2025, 04:00 PM.",
            "chartData": [
              { "date": "2025-06-01", "time": "12:00:00.000Z", "balance": 1330000 },
              { "date": "2025-06-02", "time": "12:00:00.000Z", "balance": 1332000 },
              { "date": "2025-06-03", "time": "12:00:00.000Z", "balance": 1335000 },
              { "date": "2025-06-04", "time": "12:00:00.000Z", "balance": 1336000 },
              { "date": "2025-06-05", "time": "12:00:00.000Z", "balance": 1337420.30 }
            ],
            "dailyPerformanceHistory": [
              { "date": "2025-06-23", "balance": 1337420.30, "dailyChange": 3088.08, "percentChange": 0.26, "notes": "-" },
              { "date": "2025-06-22", "balance": 1334332.22, "dailyChange": -12530.77, "percentChange": -0.26, "notes": "-" },
              { "date": "2025-06-21", "balance": 1346862.99, "dailyChange": 3088.08, "percentChange": 0.26, "notes": "-" }
            ]
          },
          "B": {
            "name": "Allocation B: Growth Strategy",
            "startingBalance": 1337420.30,
            "dailyGain": 3088.08,
            "dailyGainPercent": 0.23,
            "endingBalance": 1337420.30,
            "notes": "Band Assignment: Expansion, Routing Strategy: Dynamic, Override Status: Inactive. Last Payout: 06/17/2025, 09:15 AM. Next Unlock: 07/20/2025, 04:00 PM.",
            "chartData": [
              { "date": "2025-06-01", "time": "12:00:00.000Z", "balance": 1300000 },
              { "date": "2025-06-02", "time": "12:00:00.000Z", "balance": 1310000 },
              { "date": "2025-06-03", "time": "12:00:00.000Z", "balance": 1315000 },
              { "date": "2025-06-04", "time": "12:00:00.000Z", "balance": 1345000 },
              { "date": "2025-06-05", "time": "12:00:00.000Z", "balance": 1337420.30 }
            ],
            "dailyPerformanceHistory": [
              { "date": "2025-06-23", "balance": 1337420.30, "dailyChange": 3088.08, "percentChange": 0.26, "notes": "-" },
              { "date": "2025-06-22", "balance": 1334332.22, "dailyChange": -12530.77, "percentChange": -0.26, "notes": "-" }
            ]
          },
          "C": {
            "name": "Allocation C: Alternative Assets",
            "startingBalance": 1337420.30,
            "dailyGain": 3088.08,
            "dailyGainPercent": 0.23,
            "endingBalance": 1337420.30,
            "notes": "Band Assignment: Override, Routing Strategy: Override Driven, Override Status: Active +1.25%. Last Payout: 06/17/2025, 09:15 AM. Next Unlock: 07/20/2025, 04:00 PM.",
            "chartData": [
              { "date": "2025-06-01", "time": "12:00:00.000Z", "balance": 1340000 },
              { "date": "2025-06-02", "time": "12:00:00.000Z", "balance": 1320000 },
              { "date": "2025-06-03", "time": "12:00:00.000Z", "balance": 1350000 },
              { "date": "2025-06-04", "time": "12:00:00.000Z", "balance": 1330000 },
              { "date": "2025-06-05", "time": "12:00:00.000Z", "balance": 1337420.30 }
            ],
            "dailyPerformanceHistory": [
              { "date": "2025-06-23", "balance": 1337420.30, "dailyChange": 3088.08, "percentChange": 0.26, "notes": "-" }
            ]
          }
        },
        "assetPerformance": {
          "ETH": { "symbol": "ETH", "open": 4.68, "close": 4.72, "changePercent": 0.68, "volumeUsd": 1200000 },
          "BTC": { "symbol": "BTC", "open": 4.68, "close": 4.70, "changePercent": 0.68, "volumeUsd": 2500000 },
          "TUSD": { "symbol": "TUSD", "open": 4.68, "close": 4.68, "changePercent": 0.00, "volumeUsd": 500000 },
          "USDT": { "symbol": "USDT", "open": 4.68, "close": 4.68, "changePercent": 0.00, "volumeUsd": 800000 },
          "DAI": { "symbol": "DAI", "open": 4.68, "close": 4.68, "changePercent": 0.00, "volumeUsd": 300000 },
          "SUSD": { "symbol": "SUSD", "open": 4.68, "close": 4.69, "changePercent": 0.10, "volumeUsd": 2341047 }
        },
        "systemStatus": {
          "tradingEngine": true,
          "dataFeeds": true,
          "riskManagement": true,
          "compliance": true,
          "lastSyncSuccess": true
        },
        "visualFlags": {
          "tradingEngine": "Operational",
          "dataFeeds": "Operational",
          "riskManagement": "Operational",
          "compliance": "Operational",
          "systemSync": "OK"
        },
        "teamNotes": {
          "devStatus": "In Development",
          "developer": "John Doe",
          "expectedPreview": "2025-07-15",
          "dataEntryMode": "Manual"
        },
        "id": "68632c57479e7465a80f8524",
        "reportDate": "2025-06-23",
        "lastUpdatedDate": "2025-06-23",
        "lastUpdatedTime": "09:34:18.000Z",
        "dailyReportText": "June 16 delivered a lean +0.33% vault-gain as... See Details. Comprehensive daily performance analysis and market commentary."
      }
    ]
  }
]

// --- Main React Component ---
export default function DataForms() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  // const [submitError, setSubmitError] = useState<string | null>(null);
  // const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Create New Vault Report';
    return () => { document.title = 'Dashboard'; };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...mockData[0].data[0],
      reportDate: new Date(mockData[0].data[0].reportDate).toISOString().split('T')[0],
    }
  });

  const { fields: navChartFields, append: appendNavChart, remove: removeNavChart } = useFieldArray({ control: form.control, name: "nav.chartData" });
  const { fields: allocAChartFields, append: appendAllocAChart, remove: removeAllocAChart } = useFieldArray({ control: form.control, name: "allocations.A.chartData" });
  const { fields: allocBChartFields, append: appendAllocBChart, remove: removeAllocBChart } = useFieldArray({ control: form.control, name: "allocations.B.chartData" });
  const { fields: allocCChartFields, append: appendAllocCChart, remove: removeAllocCChart } = useFieldArray({ control: form.control, name: "allocations.C.chartData" });
  const { fields: allocADailyFields, append: appendAllocADaily, remove: removeAllocADaily } = useFieldArray({ control: form.control, name: "allocations.A.dailyPerformanceHistory" });
  const { fields: allocBDailyFields, append: appendAllocBDaily, remove: removeAllocBDaily } = useFieldArray({ control: form.control, name: "allocations.B.dailyPerformanceHistory" });
  const { fields: allocCDailyFields, append: appendAllocCDaily, remove: removeAllocCDaily } = useFieldArray({ control: form.control, name: "allocations.C.dailyPerformanceHistory" });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // setSubmitError(null);
    // setSubmitSuccess(false);

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

      // setSubmitSuccess(true);
      toast.success('Report submitted successfully!')
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      console.error("Firebase submission error:", errorMessage);
      // setSubmitError(`Failed to submit form: ${errorMessage}`);
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


  return (
    <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create New Vault Report</h1>

        {/* {submitSuccess && <div className="mb-4 p-3 bg-green-900 border border-green-700 text-green-300 rounded-lg">Report submitted successfully!</div>}
        {submitError && <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-300 rounded-lg">{submitError}</div>} */}

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

                <div className="bg-card p-4 rounded-lg space-y-4">
                  <h3 className="font-bold text-lg">System Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(Object.keys(form.getValues().systemStatus) as Array<keyof z.infer<typeof formSchema>["systemStatus"]>).map((key) => (
                      <Controller key={key} control={form.control} name={`systemStatus.${key}`} render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-3 shadow-sm bg-accent/50">
                          <FormLabel className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</FormLabel>
                          <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} disabled={field.disabled} /></FormControl>
                        </FormItem>
                      )} />
                    ))}
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
              <h3 className="font-bold text-lg">Visual Flags</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Controller control={form.control} name="visualFlags.tradingEngine" render={({ field }) => <FormItem><FormLabel>Trading Engine</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.visualFlags?.tradingEngine?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="visualFlags.dataFeeds" render={({ field }) => <FormItem><FormLabel>Data Feeds</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.visualFlags?.dataFeeds?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="visualFlags.riskManagement" render={({ field }) => <FormItem><FormLabel>Risk Management</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.visualFlags?.riskManagement?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="visualFlags.compliance" render={({ field }) => <FormItem><FormLabel>Compliance</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.visualFlags?.compliance?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="visualFlags.systemSync" render={({ field }) => <FormItem><FormLabel>System Sync</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.visualFlags?.systemSync?.message}</FormMessage></FormItem>} />
              </div>
            </div>

            <div className="bg-card p-4 rounded-lg space-y-4">
              <h3 className="font-bold text-lg">Team Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Controller control={form.control} name="teamNotes.devStatus" render={({ field }) => <FormItem><FormLabel>Dev Status</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.teamNotes?.devStatus?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="teamNotes.developer" render={({ field }) => <FormItem><FormLabel>Developer</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.teamNotes?.developer?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="teamNotes.expectedPreview" render={({ field }) => <FormItem><FormLabel>Expected Preview</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage>{form.formState.errors.teamNotes?.expectedPreview?.message}</FormMessage></FormItem>} />
                <Controller control={form.control} name="teamNotes.dataEntryMode" render={({ field }) => <FormItem><FormLabel>Data Entry Mode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage>{form.formState.errors.teamNotes?.dataEntryMode?.message}</FormMessage></FormItem>} />
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
              onClick={() => navigate('/dashboard')}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Vault Report'}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}



