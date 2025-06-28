import frame from "@/assets/icons/Frame.svg";
import { Button } from "@/components/ui/button";

export default function FromTheNews() {
  return (
    <section className="section-container p-0 flex flex-col h-[20rem] bg-[url(@/assets/image/FromTheNews.png)] bg-center bg-cover overflow-hidden">
      <div className="w-full flex items-center justify-between p-6">
        <h1 className="text-white font-bold">From the News</h1>
        <img src={frame} alt="icon" />
      </div>

      <div className="mt-auto bg-[#ffffff2c] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 ">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-muted-foreground">Jun8,2025</h1>
            <Button className="rounded-full">theblock.co</Button>
          </div>
          <div className="flex items-center justify-between mt-2 text-white">
            <p>Ethereum’s Upgrade Boosts...<span className="text-muted-foreground">See more</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};
