import { Menu, Home } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center gap-4 mb-8">
      <button className="p-2 hover:bg-secondary rounded-md transition-colors">
        <Menu size={24} />
      </button>
      
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Home size={18} />
        <span>/</span>
        <span>Config</span>
        <span>/</span>
        <span>Challenges</span>
        <span>/</span>
        <span className="text-foreground font-medium">Orders</span>
      </nav>
    </header>
  );
};

export default Header;
