import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, Trash2, X, Check } from "lucide-react";

const products = {
  CFDs: ["MT4", "MT5", "cTrader"],
  Futures: ["dxfeed", "rithmic", "tradovate"],
};

const allProducts = [...products.CFDs, ...products.Futures];

interface CountryRestriction {
  id: string;
  name: string;
  restrictions: Record<string, boolean>;
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
  "Sweden",
  "Switzerland",
  "Poland",
];

const initialBlockedCountries: CountryRestriction[] = [
  { id: "1", name: "Afghanistan", restrictions: { rithmic: true } },
  { id: "2", name: "Belarus", restrictions: { dxfeed: true } },
  { id: "3", name: "Bonaire", restrictions: { rithmic: true } },
  { id: "4", name: "Canada", restrictions: { MT4: true, MT5: true, cTrader: true, dxfeed: false, rithmic: false, tradovate: false } },
];

const BlockedCountriesTable = () => {
  const [blockedCountries, setBlockedCountries] = useState<CountryRestriction[]>(initialBlockedCountries);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const availableCountries = allCountries.filter(
    (country) => !blockedCountries.some((bc) => bc.name === country)
  );

  const handleToggleRestriction = (countryId: string, product: string) => {
    setBlockedCountries((countries) =>
      countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              restrictions: {
                ...country.restrictions,
                [product]: !country.restrictions[product],
              },
            }
          : country
      )
    );
  };

  const handleAddCountry = () => {
    if (selectedCountry) {
      const newCountry: CountryRestriction = {
        id: Date.now().toString(),
        name: selectedCountry,
        restrictions: {},
      };
      setBlockedCountries([...blockedCountries, newCountry]);
      setSelectedCountry("");
    }
  };

  const handleDeleteCountry = (id: string) => {
    setBlockedCountries((countries) => countries.filter((c) => c.id !== id));
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
            <tr className="border-b border-border bg-accent/10">
              <th className="py-3 px-4 text-left font-medium text-base" rowSpan={2}>
                Country
              </th>
              <th className="py-2 px-2 text-center font-medium text-base border-l border-border" colSpan={3}>
                CFDs
              </th>
              <th className="py-2 px-2 text-center font-medium text-base border-l border-border" colSpan={3}>
                Futures
              </th>
              <th className="py-3 px-4 text-center font-medium text-base border-l border-border" rowSpan={2}>
                Actions
              </th>
            </tr>
            <tr className="border-b border-border bg-accent/10">
              {products.CFDs.map((product, idx) => (
                <th
                  key={product}
                  className={`py-2 px-3 text-center font-medium text-sm ${idx === 0 ? "border-l border-border" : ""}`}
                >
                  {product}
                </th>
              ))}
              {products.Futures.map((product, idx) => (
                <th
                  key={product}
                  className={`py-2 px-3 text-center font-medium text-sm ${idx === 0 ? "border-l border-border" : ""}`}
                >
                  {product}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blockedCountries.map((country) => (
              <tr
                key={country.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="py-3 px-4 text-sm font-medium">{country.name}</td>
                {allProducts.map((product, idx) => (
                  <td
                    key={product}
                    className={`py-3 px-3 text-center ${idx === 0 || idx === 3 ? "border-l border-border" : ""}`}
                  >
                    <button
                      onClick={() => handleToggleRestriction(country.id, product)}
                      className="p-1 rounded hover:bg-secondary transition-colors"
                    >
                      {country.restrictions[product] ? (
                        <X className="w-5 h-5 text-destructive mx-auto" />
                      ) : (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      )}
                    </button>
                  </td>
                ))}
                <td className="py-3 px-4 text-center border-l border-border">
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
            {blockedCountries.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-muted-foreground">
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
