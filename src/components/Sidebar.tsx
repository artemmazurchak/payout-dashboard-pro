import { Home, Users, Settings, Layers, Wrench } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 bg-primary flex flex-col items-center py-4 z-50">
      <div className="mb-8 text-primary-foreground font-bold text-xl">
        TTP
      </div>
      
      <nav className="flex flex-col items-center gap-6 flex-1">
        <NavLink 
          to="/" 
          className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          activeClassName="text-primary-foreground"
        >
          <Home size={24} />
        </NavLink>
        
        <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <Users size={24} />
        </button>
        
        <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <Layers size={24} />
        </button>
        
        <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <Settings size={24} />
        </button>
        
        <button className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
          <Wrench size={24} />
        </button>
      </nav>
      
      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-primary-foreground text-sm font-medium">
          A
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
