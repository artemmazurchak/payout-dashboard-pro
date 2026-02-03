import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BlockedCountriesTable from "@/components/BlockedCountriesTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-16 p-8">
        <Header />
        <BlockedCountriesTable />
      </main>
    </div>
  );
};

export default Index;
