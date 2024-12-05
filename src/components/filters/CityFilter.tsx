import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CityFilterProps {
  city: "Yaounde" | "Douala";
  setCity: (city: "Yaounde" | "Douala") => void;
}

export function CityFilter({ city, setCity }: CityFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">City</label>
      <Select value={city} onValueChange={(value: "Yaounde" | "Douala") => setCity(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select city" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Yaounde">Yaoundé</SelectItem>
          <SelectItem value="Douala">Douala</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}