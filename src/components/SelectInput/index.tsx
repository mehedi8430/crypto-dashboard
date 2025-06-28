import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectInput() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Last Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          <SelectItem value="apple">January</SelectItem>
          <SelectItem value="banana">Feb</SelectItem>
          <SelectItem value="blueberry">March</SelectItem>
          <SelectItem value="grapes">April</SelectItem>
          <SelectItem value="pineapple">May</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
