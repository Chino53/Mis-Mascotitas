import { Home, Stethoscope, Heart, Search, User, PawPrint, MessageCircle, LogIn } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { useState } from "react";
import logo from "@/assets/logo.png";

const navItems = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Veterinarias", url: "/veterinarias", icon: Stethoscope },
  { title: "Adopción", url: "/adopcion", icon: Heart },
  { title: "Desaparecidas", url: "/desaparecidas", icon: Search },
];

const userItems = [
  { title: "Mensajes", url: "/mensajes", icon: MessageCircle },
  { title: "Perfil", url: "/perfil", icon: User },
  { title: "Mis Mascotas", url: "/mis-mascotas", icon: PawPrint },
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleUserNavClick = (e: React.MouseEvent, url: string) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-background border-r border-border p-4">
        <Link to="/" className="flex items-center gap-3 px-3 py-4 mb-4">
          <img src={logo} alt="Mis Mascotitas" className="w-10 h-10" />
          <span className="font-heading font-bold text-lg text-foreground">Mis Mascotitas</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/"}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border pt-4 space-y-1">
          {user ? (
            userItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                activeClassName="bg-primary/10 text-primary font-medium"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            ))
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-primary hover:bg-primary/10 transition-colors w-full"
            >
              <LogIn className="h-5 w-5" />
              <span className="font-medium">Iniciar Sesión</span>
            </button>
          )}
        </div>
      </aside>
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
}
