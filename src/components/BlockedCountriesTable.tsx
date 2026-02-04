import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface BlockedCountry {
  id: string;
  name: string;
}

const allCountries = [
  "Germany",
  "Spain",
  "Vietnam",
  "China",
  "United States",
  "United Kingdom",
  "France",
  "Japan",
  "Italy",
  "Canada",
  "Australia",
  "Brazil",
  "India",
  "Mexico",
  "South Korea",
  "Russia",
  "Netherlands",
  "Sweden",
  "Switzerland",
  "Poland",
];

const initialBlockedCountries: BlockedCountry[] = [
  { id: "1", name: "Russia" },
  { id: "2", name: "China" },
  { id: "3", name: "Vietnam" },
  { id: "4", name: "India" },
];

const BlockedCountriesTable = () => {
  const [blockedCountries, setBlockedCountries] = useState<BlockedCountry[]>(initialBlockedCountries);
  const [selectedBlockedCountry, setSelectedBlockedCountry] = useState<string>("");

  const availableBlockedCountries = allCountries.filter(
    (country) => !blockedCountries.some((bc) => bc.name === country)
  );

  const handleAddBlockedCountry = () => {
    if (selectedBlockedCountry) {
      const newCountry: BlockedCountry = {
        id: Date.now().toString(),
        name: selectedBlockedCountry,
      };
      setBlockedCountries([...blockedCountries, newCountry]);
      setSelectedBlockedCountry("");
    }
  };

  const handleDeleteBlockedCountry = (id: string) => {
    setBlockedCountries(blockedCountries.filter((country) => country.id !== id));
  };

  const handleSave = () => {
    console.log("Saved blocked countries:", blockedCountries);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Blocked Countries</h2>
        <p className="text-muted-foreground">
          Countries from this list will not be able to purchase products on our website.
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-[250px]">
          <Select value={selectedBlockedCountry} onValueChange={setSelectedBlockedCountry}>
            <SelectTrigger className="h-10 border border-border rounded-lg bg-background">
              <SelectValue placeholder="Select country to add" />
            </SelectTrigger>
            <SelectContent>
              {availableBlockedCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleAddBlockedCountry}
          disabled={!selectedBlockedCountry}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add Country
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="py-3 px-6 text-left font-medium text-base">Country</th>
              <th className="py-3 px-6 text-center font-medium text-base w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blockedCountries.map((country) => (
              <tr
                key={country.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="py-3 px-6 text-sm">{country.name}</td>
                <td className="py-3 px-6 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBlockedCountry(country.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))}
            {blockedCountries.length === 0 && (
              <tr>
                <td colSpan={2} className="py-8 text-center text-muted-foreground">
                  No countries added yet. Add countries using the dropdown above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlockedCountriesTable;
