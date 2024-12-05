import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ priceRange, setPriceRange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Price Range: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} FCFA
      </label>
      <Slider
        min={0}
        max={1000000}
        step={50000}
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as [number, number])}
        className="mt-6"
      />
    </div>
  );
}