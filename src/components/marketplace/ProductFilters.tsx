import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Living" },
  { value: "beauty", label: "Beauty & Health" },
  { value: "sports", label: "Sports & Outdoors" },
];

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <RadioGroup
            value={selectedCategory}
            onValueChange={onCategoryChange}
            className="space-y-2"
          >
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <RadioGroupItem value={category.value} id={category.value} />
                <Label htmlFor={category.value}>{category.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
}