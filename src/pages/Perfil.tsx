import { MainLayout } from "@/components/layout/MainLayout";
import { User, Phone, Calendar, Trash2, Sun, Moon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

const Perfil = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Perfil</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona tu información personal.</p>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{user?.user_metadata?.full_name || "Usuario"}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Tu nombre" defaultValue={user?.user_metadata?.full_name?.split(" ")[0] || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input id="apellido" placeholder="Tu apellido" defaultValue={user?.user_metadata?.full_name?.split(" ").slice(1).join(" ") || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Fecha de nacimiento</Label>
            <Input id="dob" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genero">Género</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="masculino">Masculino</SelectItem>
                <SelectItem value="femenino">Femenino</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" placeholder="+54 11 1234-5678" />
          </div>

          <Button className="w-full bg-primary text-primary-foreground">
            Guardar Perfil
          </Button>
        </div>

        <Separator />

        {/* Theme */}
        <div className="space-y-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Apariencia</h2>
          <div className="flex items-center justify-between bg-card rounded-lg shadow-card p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
              <div>
                <p className="text-sm font-medium text-foreground">Modo Oscuro</p>
                <p className="text-xs text-muted-foreground">Cambiar entre tema claro y oscuro</p>
              </div>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </div>

        <Separator />

        {/* Account settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Configuración de Cuenta</h2>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5">
            <Trash2 className="h-4 w-4" />
            Dar de Baja la Cuenta
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Perfil;
