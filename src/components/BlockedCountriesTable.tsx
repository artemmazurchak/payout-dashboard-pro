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
import { Plus, Save, Trash2 } from "lucide-react";

interface BlockedCountry {
  id: string;
  name: string;
}

interface ActiveCountry {
  id: string;
  name: string;
  active: boolean;
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

const initialActiveCountries: ActiveCountry[] = [
  { id: "1", name: "Germany", active: true },
  { id: "2", name: "Spain", active: false },
  { id: "3", name: "France", active: true },
];

const BlockedCountriesTable = () => {
  const [blockedCountries, setBlockedCountries] = useState<BlockedCountry[]>(initialBlockedCountries);
  const [selectedBlockedCountry, setSelectedBlockedCountry] = useState<string>("");

  const [activeCountries, setActiveCountries] = useState<ActiveCountry[]>(initialActiveCountries);
  const [selectedActiveCountry, setSelectedActiveCountry] = useState<string>("");

  const availableBlockedCountries = allCountries.filter(
    (country) => !blockedCountries.some((bc) => bc.name === country)
  );

  const availableActiveCountries = allCountries.filter(
    (country) => !activeCountries.some((ac) => ac.name === country)
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

  const handleAddActiveCountry = () => {
    if (selectedActiveCountry) {
      const newCountry: ActiveCountry = {
        id: Date.now().toString(),
        name: selectedActiveCountry,
        active: true,
      };
      setActiveCountries([...activeCountries, newCountry]);
      setSelectedActiveCountry("");
    }
  };

  const handleDeleteActiveCountry = (id: string) => {
    setActiveCountries(activeCountries.filter((country) => country.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setActiveCountries((countries) =>
      countries.map((country) =>
        country.id === id ? { ...country, active: !country.active } : country
      )
    );
  };

  const handleSave = () => {
    console.log("Saved blocked countries:", blockedCountries);
    console.log("Saved active countries:", activeCountries);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Setting up products and countries</h1>

      {/* Blocked Countries Section */}
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

      {/* Active Countries Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Active Countries</h2>
          <p className="text-muted-foreground">
            Manage which countries are active for product availability.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="w-[250px]">
            <Select value={selectedActiveCountry} onValueChange={setSelectedActiveCountry}>
              <SelectTrigger className="h-10 border border-border rounded-lg bg-background">
                <SelectValue placeholder="Select country to add" />
              </SelectTrigger>
              <SelectContent>
                {availableActiveCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleAddActiveCountry}
            disabled={!selectedActiveCountry}
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
                <th className="py-3 px-6 text-center font-medium text-base">Active</th>
                <th className="py-3 px-6 text-center font-medium text-base w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeCountries.map((country) => (
                <tr
                  key={country.id}
                  className="border-b border-border hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-6 text-sm">{country.name}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={country.active}
                        onCheckedChange={() => handleToggleActive(country.id)}
                      />
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteActiveCountry(country.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
              {activeCountries.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-muted-foreground">
                    No countries added yet. Add countries using the dropdown above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
