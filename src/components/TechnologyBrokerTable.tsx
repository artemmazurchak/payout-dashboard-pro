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

interface BrokerStatus {
  orbex: boolean;
  gbe: boolean;
  tickmill: boolean;
  dxfeed: boolean;
  rithmic: boolean;
  tradovate: boolean;
  stocks: boolean;
}

interface CountryBroker {
  id: string;
  name: string;
  brokers: BrokerStatus;
}

const allCountries = [
  "Algeria",
  "Argentina",
  "Austria",
  "Bahrain",
  "Bolivia",
  "Brazil",
  "Chile",
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
  "India",
  "Mexico",
  "South Korea",
];

const initialCountryBrokers: CountryBroker[] = [
  {
    id: "1",
    name: "Algeria",
    brokers: { orbex: false, gbe: false, tickmill: true, dxfeed: true, rithmic: true, tradovate: true, stocks: true },
  },
  {
    id: "2",
    name: "Argentina",
    brokers: { orbex: false, gbe: false, tickmill: true, dxfeed: true, rithmic: true, tradovate: true, stocks: true },
  },
  {
    id: "3",
    name: "Austria",
    brokers: { orbex: false, gbe: false, tickmill: true, dxfeed: true, rithmic: true, tradovate: true, stocks: true },
  },
  {
    id: "4",
    name: "Bahrain",
    brokers: { orbex: false, gbe: false, tickmill: true, dxfeed: true, rithmic: true, tradovate: true, stocks: true },
  },
  {
    id: "5",
    name: "Bolivia",
    brokers: { orbex: false, gbe: false, tickmill: true, dxfeed: true, rithmic: true, tradovate: true, stocks: true },
  },
  {
    id: "6",
    name: "Brazil",
    brokers: { orbex: false, gbe: false, tickmill: true, dxfeed: true, rithmic: true, tradovate: true, stocks: true },
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

const TechnologyBrokerTable = () => {
  const [countryBrokers, setCountryBrokers] = useState<CountryBroker[]>(initialCountryBrokers);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const availableCountries = allCountries.filter(
    (country) => !countryBrokers.some((cb) => cb.name === country)
  );

  const handleAddCountry = () => {
    if (selectedCountry) {
      const newCountry: CountryBroker = {
        id: Date.now().toString(),
        name: selectedCountry,
        brokers: {
          orbex: true,
          gbe: true,
          tickmill: true,
          dxfeed: true,
          rithmic: true,
          tradovate: true,
          stocks: true,
        },
      };
      setCountryBrokers([...countryBrokers, newCountry]);
      setSelectedCountry("");
    }
  };

  const handleDeleteCountry = (id: string) => {
    setCountryBrokers(countryBrokers.filter((country) => country.id !== id));
  };

  const handleToggleBroker = (countryId: string, broker: keyof BrokerStatus) => {
    setCountryBrokers((countries) =>
      countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              brokers: {
                ...country.brokers,
                [broker]: !country.brokers[broker],
              },
            }
          : country
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Technology Broker</h2>
        <p className="text-muted-foreground">
          Manage broker availability for each country. Click on checkmarks or crosses to toggle status.
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
              <th className="py-2 px-2 text-center font-medium text-base border-l border-border" rowSpan={2}>
                Stocks
              </th>
              <th className="py-3 px-6 text-center font-medium text-base w-24 border-l border-border" rowSpan={2}>
                Actions
              </th>
            </tr>
            <tr className="border-b border-border bg-secondary/30">
              <th className="py-2 px-2 text-center font-medium text-sm border-l border-border">Orbex</th>
              <th className="py-2 px-2 text-center font-medium text-sm">GBE</th>
              <th className="py-2 px-2 text-center font-medium text-sm">Tickmill</th>
              <th className="py-2 px-2 text-center font-medium text-sm border-l border-border">dxfeed</th>
              <th className="py-2 px-2 text-center font-medium text-sm">rithmic</th>
              <th className="py-2 px-2 text-center font-medium text-sm">tradovate</th>
            </tr>
          </thead>
          <tbody>
            {countryBrokers.map((country) => (
              <tr
                key={country.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="py-3 px-6 text-sm font-medium">{country.name}</td>
                <td className="py-3 px-2 text-center border-l border-border">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.orbex}
                      onChange={() => handleToggleBroker(country.id, "orbex")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.gbe}
                      onChange={() => handleToggleBroker(country.id, "gbe")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.tickmill}
                      onChange={() => handleToggleBroker(country.id, "tickmill")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center border-l border-border">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.dxfeed}
                      onChange={() => handleToggleBroker(country.id, "dxfeed")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.rithmic}
                      onChange={() => handleToggleBroker(country.id, "rithmic")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.tradovate}
                      onChange={() => handleToggleBroker(country.id, "tradovate")}
                    />
                  </div>
                </td>
                <td className="py-3 px-2 text-center border-l border-border">
                  <div className="flex justify-center">
                    <StatusToggle
                      checked={country.brokers.stocks}
                      onChange={() => handleToggleBroker(country.id, "stocks")}
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
            {countryBrokers.length === 0 && (
              <tr>
                <td colSpan={9} className="py-8 text-center text-muted-foreground">
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

export default TechnologyBrokerTable;
