import { Home, Stethoscope, Heart, Search, MessageCircle, LogIn } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { useState } from "react";

const publicItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Vets", url: "/veterinarias", icon: Stethoscope },
  { title: "Adopción", url: "/adopcion", icon: Heart },
  { title: "Perdidas", url: "/desaparecidas", icon: Search },
];

export function BottomNav() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
        <div className="flex items-center justify-around h-16">
          {publicItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className="flex flex-col items-center gap-1 px-2 py-1.5 text-muted-foreground transition-colors"
              activeClassName="text-primary"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.title}</span>
            </NavLink>
          ))}
          {user ? (
            <NavLink
              to="/mensajes"
              className="flex flex-col items-center gap-1 px-2 py-1.5 text-muted-foreground transition-colors"
              activeClassName="text-primary"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-[10px] font-medium">Mensajes</span>
            </NavLink>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex flex-col items-center gap-1 px-2 py-1.5 text-primary transition-colors"
            >
              <LogIn className="h-5 w-5" />
              <span className="text-[10px] font-medium">Entrar</span>
            </button>
          )}
        </div>
      </nav>
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
}
