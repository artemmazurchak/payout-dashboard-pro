import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformStatus {
  mt4: boolean;
  mt5: boolean;
  cTrader: boolean;
  dxfeed: boolean;
  rithmic: boolean;
  tradovate: boolean;
}

interface CountryPlatform {
  id: string;
  name: string;
  platforms: PlatformStatus;
}

const allCountries = [
  "Afghanistan",
  "Belarus",
  "Bonaire",
  "Canada",
  "Germany",
  "Spain",
  "Vietnam",
  "China",
  "United States",
  "United Kingdom",
  "France",
  "Japan",
  "Italy",
  "Australia",
  "Brazil",
  "India",
  "Mexico",
  "South Korea",
  "Russia",
  "Netherlands",
];

const initialCountryPlatforms: CountryPlatform[] = [
  {
    id: "1",
    name: "Afghanistan",
    platforms: { mt4: true, mt5: true, cTrader: true, dxfeed: true, rithmic: false, tradovate: true },
  },
  {
    id: "2",
    name: "Belarus",
    platforms: { mt4: true, mt5: true, cTrader: true, dxfeed: false, rithmic: true, tradovate: true },
  },
  {
    id: "3",
    name: "Bonaire",
    platforms: { mt4: true, mt5: true, cTrader: true, dxfeed: true, rithmic: false, tradovate: true },
  },
  {
    id: "4",
    name: "Canada",
    platforms: { mt4: false, mt5: false, cTrader: false, dxfeed: true, rithmic: true, tradovate: true },
  },
];

interface StatusToggleProps {
  checked: boolean;
  onChange: () => void;
}

const StatusToggle = ({ checked, onChange }: StatusToggleProps) => {
  return (
    <button
      onClick={onChange}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-secondary",
        checked ? "text-green-500" : "text-destructive"
      )}
    >
      {checked ? <Check size={20} strokeWidth={3} /> : <X size={20} strokeWidth={3} />}
    </button>
  );
};

const TechnologyPlatformTable = () => {
  const [countryPlatforms, setCountryPlatforms] = useState<CountryPlatform[]>(initialCountryPlatforms);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const availableCountries = allCountries.filter(
    (country) => !countryPlatforms.some((cp) => cp.name === country)
  );

  const handleAddCountry = () => {
    if (selectedCountry) {
      const newCountry: CountryPlatform = {
        id: Date.now().toString(),
        name: selectedCountry,
        platforms: {
          mt4: true,
          mt5: true,
          cTrader: true,
          dxfeed: true,
          rithmic: true,
          tradovate: true,
        },
      };
      setCountryPlatforms([...countryPlatforms, newCountry]);
      setSelectedCountry("");
    }
  };

  const handleDeleteCountry = (id: string) => {
    setCountryPlatforms(countryPlatforms.filter((country) => country.id !== id));
  };

  const handleTogglePlatform = (countryId: string, platform: keyof PlatformStatus) => {
    setCountryPlatforms((countries) =>
      countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              platforms: {
                ...country.platforms,
                [platform]: !country.platforms[platform],
              },
            }
          : country
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Technology Platform</h2>
        <p className="text-muted-foreground">
          Manage platform availability for each country. Click on checkmarks or crosses to toggle status.
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
              <th className="py-3 px-6 text-left font-medium text-base" rowSpan={2}>
                Country
              </th>
              <th className="py-2 px-2 text-center font-medium text-base border-l border-border" colSpan={3}>
                CFDs
              </th>
              <th className="py-2 px-2 text-center font-medium text-base border-l border-border" colSpan={3}>
                Futures
              </th>
              <th className="py-3 px-6 text-center font-medium text-base w-24 border-l border-border" rowSpan={2}>
                Actions
              </th>
            </tr>
            <tr className="border-b border-border bg-secondary/30">
              <th className="py-2 px-2 text-center font-medium text-sm border-l border-border">MT4</th>
              <th className="py-2 px-2 text-center font-medium text-sm">MT5</th>
              <th className="py-2 px-2 text-center font-medium text-sm">cTrader</th>
              <th className="py-2 px-2 text-center font-medium text-sm border-l border-border">dxfeed</th>
              <th className="py-2 px-2 text-center font-medium text-sm">rithmic</th>
              <th className="py-2 px-2 text-center font-medium text-sm">tradovate</th>
            </tr>
          </thead>
          <tbody>
            {countryPlatforms.map((country) => (
              <tr
                key={country.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="py-3 px-6 text-sm font-medium">{country.name}</td>
                <td className="py-3 px-2 text-center border-l border-border">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.platforms.mt4}
                      onChange={() => handleTogglePlatform(country.id, "mt4")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.platforms.mt5}
                      onChange={() => handleTogglePlatform(country.id, "mt5")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.platforms.cTrader}
                      onChange={() => handleTogglePlatform(country.id, "cTrader")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center border-l border-border">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.platforms.dxfeed}
                      onChange={() => handleTogglePlatform(country.id, "dxfeed")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.platforms.rithmic}
                      onChange={() => handleTogglePlatform(country.id, "rithmic")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.platforms.tradovate}
                      onChange={() => handleTogglePlatform(country.id, "tradovate")}
                    />
                  </div>
                </td>
                <td className="py-3 px-6 text-center border-l border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCountry(country.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))}
            {countryPlatforms.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground">
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

export default TechnologyPlatformTable;
