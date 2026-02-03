import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save } from "lucide-react";

interface Country {
  id: string;
  name: string;
  blocked: boolean;
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

const initialBlockedCountries: Country[] = [
  { id: "1", name: "Russia", blocked: true },
  { id: "2", name: "China", blocked: true },
  { id: "3", name: "Vietnam", blocked: false },
  { id: "4", name: "India", blocked: true },
];

const BlockedCountriesTable = () => {
  const [blockedCountries, setBlockedCountries] = useState<Country[]>(initialBlockedCountries);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const availableCountries = allCountries.filter(
    (country) => !blockedCountries.some((bc) => bc.name === country)
  );

  const handleToggle = (id: string) => {
    setBlockedCountries((countries) =>
      countries.map((country) =>
        country.id === id ? { ...country, blocked: !country.blocked } : country
      )
    );
  };

  const handleAddCountry = () => {
    if (selectedCountry) {
      const newCountry: Country = {
        id: Date.now().toString(),
        name: selectedCountry,
        blocked: true,
      };
      setBlockedCountries([...blockedCountries, newCountry]);
      setSelectedCountry("");
    }
  };

  const handleSave = () => {
    console.log("Saved blocked countries:", blockedCountries);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Setting up products and countries</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Blocked Countries</h2>
        <p className="text-muted-foreground">
          Countries from this list will not be able to purchase products on our website.
        </p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="w-[250px]">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-10 border border-border rounded-lg bg-background">
              <SelectValue placeholder="Select country to add" />
            </SelectTrigger>
            <SelectContent>
              {availableCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleAddCountry}
          disabled={!selectedCountry}
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
              <th className="py-3 px-6 text-center font-medium text-base">Blocked</th>
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
                  <div className="flex justify-center">
                    <Switch
                      checked={country.blocked}
                      onCheckedChange={() => handleToggle(country.id)}
                    />
                  </div>
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

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
        >
          <Save size={18} />
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default BlockedCountriesTable;
