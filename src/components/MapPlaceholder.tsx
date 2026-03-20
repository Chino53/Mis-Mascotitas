import { MapPin } from "lucide-react";

interface MapPlaceholderProps {
  category: string;
}

export function MapPlaceholder({ category }: MapPlaceholderProps) {
  const colorMap: Record<string, string> = {
    veterinaria: "text-primary",
    adopcion: "text-success",
    desaparecida: "text-destructive",
    general: "text-primary",
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-surface gap-3 p-8">
      <MapPin className={`h-12 w-12 ${colorMap[category] || "text-primary"} animate-pulse-marker`} />
      <p className="text-muted-foreground text-sm text-center">
        Mapa interactivo — Se habilitará con Google Maps API
      </p>
    </div>
  );
}
