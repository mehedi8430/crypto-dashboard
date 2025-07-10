/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Mock Data
const mockData = {
  reportDate: "2024-07-15",
  nav: {
    startingNav: 100000,
    endingNav: 105000,
    growthPercent: 5,
    chartData: [
      { date: "2024-07-01", time: "09:00", nav: 100000 },
      { date: "2024-07-02", time: "09:00", nav: 101000 },
      { date: "2024-07-03", time: "09:00", nav: 102000 },
      { date: "2024-07-04", time: "09:00", nav: 101500 },
      { date: "2024-07-05", time: "09:00", nav: 103000 },
      { date: "2024-07-06", time: "09:00", nav: 104000 },
      { date: "2024-07-07", time: "09:00", nav: 105000 },
    ],
  },
  allocationBreakdown: {
    A_percent: 30,
    B_percent: 25,
    C_percent: 20,
    D_percent: 15,
    auditPac_percent: 10,
  },
  allocations: {
    A: {
      name: "Allocation A",
      startingBalance: 30000,
      dailyGain: 1500,
      dailyGainPercent: 5,
      endingBalance: 31500,
      notes: "Core holdings performed well.",
      chartData: [
        { date: "2024-07-01", time: "09:00", balance: 30000 },
        { date: "2024-07-02", time: "09:00", balance: 30500 },
        { date: "2024-07-03", time: "09:00", balance: 31000 },
        { date: "2024-07-04", time: "09:00", balance: 30800 },
        { date: "2024-07-05", time: "09:00", balance: 31200 },
        { date: "2024-07-06", time: "09:00", balance: 31400 },
        { date: "2024-07-07", time: "09:00", balance: 31500 },
      ],
      dailyPerformanceHistory: [
          { date: "2024-07-07", balance: 31500, dailyChange: 100, percentChange: 0.32, notes: "Stable growth" }
      ],
      lastPayout: new Date().toISOString(),
      nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    B: {
        name: "Allocation B",
        startingBalance: 25000,
        dailyGain: 1250,
        dailyGainPercent: 5,
        endingBalance: 26250,
        notes: "Growth strategy showing promise.",
        chartData: [
            { date: "2024-07-01", time: "09:00", balance: 25000 },
            { date: "2024-07-07", time: "09:00", balance: 26250 },
        ],
        dailyPerformanceHistory: [
            { date: "2024-07-07", balance: 26250, dailyChange: 150, percentChange: 0.57, notes: "Positive trend" }
        ],
        lastPayout: new Date().toISOString(),
        nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    C: {
        name: "Allocation C",
        startingBalance: 20000,
        dailyGain: 1000,
        dailyGainPercent: 5,
        endingBalance: 21000,
        notes: "Alternative assets are stable.",
        chartData: [
            { date: "2024-07-01", time: "09:00", balance: 20000 },
            { date: "2024-07-07", time: "09:00", balance: 21000 },
        ],
        dailyPerformanceHistory: [
            { date: "2024-07-07", balance: 21000, dailyChange: 50, percentChange: 0.24, notes: "Steady" }
        ],
        lastPayout: new Date().toISOString(),
        nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    D: {
        name: "Allocation D",
        startingBalance: 15000,
        dailyGain: 750,
        dailyGainPercent: 5,
        endingBalance: 15750,
        notes: "Exploring new opportunities.",
        chartData: [
            { date: "2024-07-01", time: "09:00", balance: 15000 },
            { date: "2024-07-07", time: "09:00", balance: 15750 },
        ],
        dailyPerformanceHistory: [
            { date: "2024-07-07", balance: 15750, dailyChange: 20, percentChange: 0.13, notes: "Initial phase" }
        ],
        lastPayout: new Date().toISOString(),
        nextUnlock: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  },
  assetPerformance: {
    ETH: { symbol: "ETH", open: 3000, close: 3100, changePercent: 3.33, volumeUsd: 1500000000 },
    BTC: { symbol: "BTC", open: 60000, close: 62000, changePercent: 3.33, volumeUsd: 30000000000 },
    TUSD: { symbol: "TUSD", open: 1, close: 1, changePercent: 0, volumeUsd: 500000000 },
    USDT: { symbol: "USDT", open: 1, close: 1, changePercent: 0, volumeUsd: 70000000000 },
    DAI: { symbol: "DAI", open: 1, close: 1, changePercent: 0, volumeUsd: 200000000 },
    SUSD: { symbol: "SUSD", open: 1, close: 1, changePercent: 0, volumeUsd: 10000000 },
  },
  systemStatus: {
    tradingEngine: true,
    dataFeeds: true,
    riskManagement: true,
    compliance: true,
    lastSyncSuccess: true,
  },
  visualFlags: {
    tradingEngine: "green",
    dataFeeds: "green",
    riskManagement: "green",
    compliance: "green",
    systemSync: "green",
  },
  teamNotes: {
    devStatus: "All systems operational",
    developer: "Admin",
    expectedPreview: "N/A",
    dataEntryMode: "Manual",
  },
  dailyReportText: "A brief summary of today's market performance and outlook.",
};

const formSchema = z.object({
    reportDate: z.string().min(1, "Report date is required"),
    nav: z.object({
     startingNav: z.number({ required_error: "Field is required" }),
     endingNav: z.number({ required_error: "Field is required" }),
     growthPercent: z.number({ required_error: "Field is required" }),
    }),
    allocationBreakdown: z.object({
     A_percent: z.number({ required_error: "Field is required" }),
     B_percent: z.number({ required_error: "Field is required" }),
     C_percent: z.number({ required_error: "Field is required" }),
     D_percent: z.number({ required_error: "Field is required" }),
     auditPac_percent: z.number({ required_error: "Field is required" }),
    }),
    allocations: z.object({
     A: z.object({
        name: z.string(),
        startingBalance: z.number(),
        endingBalance: z.number(),
        dailyGain: z.number(),
        dailyGainPercent: z.number(),
        notes: z.string().optional(),
        lastPayout: z.string().optional(),
        nextUnlock: z.string().optional(),
     }),
     B: z.object({
        name: z.string(),
        startingBalance: z.number(),
        endingBalance: z.number(),
        dailyGain: z.number(),
        dailyGainPercent: z.number(),
        notes: z.string().optional(),
        lastPayout: z.string().optional(),
        nextUnlock: z.string().optional(),
     }),
     C: z.object({
        name: z.string(),
        startingBalance: z.number(),
        endingBalance: z.number(),
        dailyGain: z.number(),
        dailyGainPercent: z.number(),
        notes: z.string().optional(),
        lastPayout: z.string().optional(),
        nextUnlock: z.string().optional(),
     }),
     D: z.object({
        name: z.string(),
        startingBalance: z.number(),
        endingBalance: z.number(),
        dailyGain: z.number(),
        dailyGainPercent: z.number(),
        notes: z.string().optional(),
        lastPayout: z.string().optional(),
        nextUnlock: z.string().optional(),
     }),
    }),
    assetPerformance: z.object({
     ETH: z.object({ symbol: z.string(), open: z.number(), close: z.number(), changePercent: z.number(), volumeUsd: z.number() }),
     BTC: z.object({ symbol: z.string(), open: z.number(), close: z.number(), changePercent: z.number(), volumeUsd: z.number() }),
     TUSD: z.object({ symbol: z.string(), open: z.number(), close: z.number(), changePercent: z.number(), volumeUsd: z.number() }),
     USDT: z.object({ symbol: z.string(), open: z.number(), close: z.number(), changePercent: z.number(), volumeUsd: z.number() }),
     DAI: z.object({ symbol: z.string(), open: z.number(), close: z.number(), changePercent: z.number(), volumeUsd: z.number() }),
     SUSD: z.object({ symbol: z.string(), open: z.number(), close: z.number(), changePercent: z.number(), volumeUsd: z.number() }),
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


export default function DataForms() {
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [initialData] = useState(mockData);


 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: initialData,
 });

 async function onSubmit(values: z.infer<typeof formSchema>) {
  setIsSubmitting(true);
  try {
   console.log("Form Submitted", values);
   toast.success('Report submitted successfully!');
   // Here you would typically send the data to a server or update your mock data source
  } catch (error) {
   const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
   console.error("Submission error:", errorMessage);
   toast.error(errorMessage)
  } finally {
   setIsSubmitting(false);
  }
 }


 if (!initialData) {
  return (
   <div className="flex justify-center items-center h-screen">
    <span className="loader"></span>
   </div>
  )
 }


 return (
  <div className="bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8">
   <div className="max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Manage Data</h1>


    <FormProvider {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


      <div className="bg-card p-4 rounded-lg">
       <FormItem>
         <FormLabel>Report Date</FormLabel>
         <FormControl><Input type="date" {...form.register("reportDate")} /></FormControl>
         <FormMessage>{form.formState.errors.reportDate?.message}</FormMessage>
        </FormItem>
      </div>


      {/* Other form sections go here */}
      {/* Example for NAV */}
      <div className="bg-card p-4 rounded-lg space-y-4">
         <h3 className="font-bold text-lg">Total NAV</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormItem><FormLabel>Starting NAV</FormLabel><FormControl><Input type="number" {...form.register("nav.startingNav", { valueAsNumber: true })} /></FormControl><FormMessage>{form.formState.errors.nav?.startingNav?.message}</FormMessage></FormItem>
          <FormItem><FormLabel>Ending NAV</FormLabel><FormControl><Input type="number" {...form.register("nav.endingNav", { valueAsNumber: true })} /></FormControl><FormMessage>{form.formState.errors.nav?.endingNav?.message}</FormMessage></FormItem>
          <FormItem><FormLabel>Growth %</FormLabel><FormControl><Input type="number" step="0.01" {...form.register("nav.growthPercent", { valueAsNumber: true })} /></FormControl><FormMessage>{form.formState.errors.nav?.growthPercent?.message}</FormMessage></FormItem>
         </div>
      </div>


      {/* Example for Allocations */}
      <div className="bg-card p-4 rounded-lg space-y-6">
       <h3 className="font-bold text-lg">Allocations</h3>
       {(Object.keys(form.getValues().allocations) as Array<keyof typeof mockData.allocations>).map((key) => (
         <div key={key} className="bg-accent/50 p-4 rounded-lg space-y-4">
          <h4 className="font-bold text-primary">{form.getValues().allocations[key].name}</h4>
            <div className="grid grid-cols-2 gap-4">
                <FormItem><FormLabel>Start Balance</FormLabel><FormControl><Input type="number" {...form.register(`allocations.${key}.startingBalance`, { valueAsNumber: true })} /></FormControl></FormItem>
                <FormItem><FormLabel>End Balance</FormLabel><FormControl><Input type="number" {...form.register(`allocations.${key}.endingBalance`, { valueAsNumber: true })} /></FormControl></FormItem>
                <FormItem><FormLabel>Daily Gain</FormLabel><FormControl><Input type="number" {...form.register(`allocations.${key}.dailyGain`, { valueAsNumber: true })} /></FormControl></FormItem>
                <FormItem><FormLabel>Daily Gain %</FormLabel><FormControl><Input type="number" {...form.register(`allocations.${key}.dailyGainPercent`, { valueAsNumber: true })} /></FormControl></FormItem>
            </div>
         </div>
        ))}
      </div>


      <Button
       type="submit"
       disabled={isSubmitting}
       className="w-full text-lg"
      >
       {isSubmitting ? 'Submitting...' : 'Update Data'}
      </Button>
     </form>
    </FormProvider>
   </div>
  </div>
 );
}