import SelectInput from "@/components/SelectInput";
import TotalNavChart from "./TotalNavChart";

export default function TotalNavPanel() {
  return (
    <section className="section-container">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-foreground/80 text-xs">
          Total NAV
          <span className="text-foreground text-[16px] font-bold ml-1">
            $35,00.00
          </span>
        </h3>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-1">
            <p className="text-primary text-xs">+0.68%</p>
            <p className="text-foreground/70 text-[10px]">Total growth</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-primary text-xs">+0.68%</p>
            <p className="text-foreground/70 text-[10px]">Total growth</p>
          </div>

          <SelectInput />
        </div>
      </div>

      {/* Chart */}
      <TotalNavChart />
    </section>
  );
}
