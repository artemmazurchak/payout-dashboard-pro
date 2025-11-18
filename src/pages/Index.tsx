import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PaymentMethodsTable from "@/components/PaymentMethodsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-16 p-8">
        <Header />
        <PaymentMethodsTable />
      </main>
    </div>
  );
};

export default Index;
