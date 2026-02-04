import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BlockedCountriesTable from "@/components/BlockedCountriesTable";
import TechnologyPlatformTable from "@/components/TechnologyPlatformTable";
import TechnologyBrokerTable from "@/components/TechnologyBrokerTable";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const Index = () => {
  const handleSaveAll = () => {
    console.log("Saving all settings...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-16 p-8">
        <Header />
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Setting up products and countries</h1>
          
          <BlockedCountriesTable />
          
          <TechnologyPlatformTable />
          
          <TechnologyBrokerTable />
          
          <div className="flex justify-end">
            <Button
              onClick={handleSaveAll}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
            >
              <Save size={18} />
              SAVE
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
