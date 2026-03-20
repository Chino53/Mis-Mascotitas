import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Veterinarias from "./pages/Veterinarias";
import Adopcion from "./pages/Adopcion";
import Desaparecidas from "./pages/Desaparecidas";
import Perfil from "./pages/Perfil";
import MisMascotas from "./pages/MisMascotas";
import Mensajes from "./pages/Mensajes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/veterinarias" element={<Veterinarias />} />
              <Route path="/adopcion" element={<Adopcion />} />
              <Route path="/desaparecidas" element={<Desaparecidas />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/mis-mascotas" element={<MisMascotas />} />
              <Route path="/mensajes" element={<Mensajes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
