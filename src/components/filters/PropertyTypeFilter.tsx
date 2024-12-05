import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyTypeFilterProps {
  propertyType: string;
  setPropertyType: (type: string) => void;
}

export function PropertyTypeFilter({ propertyType, setPropertyType }: PropertyTypeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Property Type</label>
      <Select value={propertyType} onValueChange={setPropertyType}>
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="apartment">Apartment</SelectItem>
          <SelectItem value="furnished-apartment">Furnished apartment</SelectItem>
          <SelectItem value="house">House</SelectItem>
          <SelectItem value="studio">Studio</SelectItem>
          <SelectItem value="room">Room</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}