import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PostData } from "./PostCard";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const categoryColors: Record<string, string> = {
  veterinaria: "#0284C7",
  adopcion: "#0D9488",
  desaparecida: "#E11D48",
  general: "#0284C7",
};

function createCategoryIcon(category: string) {
  const color = categoryColors[category] || categoryColors.general;
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color};
      width: 28px; height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

interface InteractiveMapProps {
  category: string;
  posts?: PostData[];
}

export function InteractiveMap({ category, posts = [] }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [locationRequested, setLocationRequested] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Default: Buenos Aires
    const map = L.map(containerRef.current, {
      center: [-34.6037, -58.3816],
      zoom: 12,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    mapRef.current = map;

    // Request geolocation
    if (navigator.geolocation && !locationRequested) {
      setLocationRequested(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.flyTo([latitude, longitude], 13, { duration: 1.5 });

          // User location marker
          L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: "user-marker",
              html: `<div style="
                width: 16px; height: 16px;
                background: hsl(199, 89%, 39%);
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 0 0 3px hsla(199, 89%, 39%, 0.3), 0 2px 4px rgba(0,0,0,0.2);
              "></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            }),
          })
            .addTo(map)
            .bindPopup("Tu ubicación");
        },
        () => {
          // Permission denied - stay at default
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Add post markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const markers: L.Marker[] = [];

    posts
      .filter((p) => p.lat != null && p.lng != null)
      .forEach((post) => {
        const marker = L.marker([post.lat!, post.lng!], {
          icon: createCategoryIcon(post.category),
        })
          .addTo(map)
          .bindPopup(
            `<div style="max-width:200px">
              <p style="font-weight:600;font-size:13px;margin:0">${post.authorName}</p>
              <p style="font-size:12px;margin:4px 0;color:#666">${post.content.substring(0, 80)}...</p>
              ${post.location ? `<p style="font-size:11px;color:#0284C7;margin:0">${post.location}</p>` : ""}
            </div>`
          );
        markers.push(marker);
      });

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [posts]);

  return (
    <div ref={containerRef} className="h-full w-full z-0" style={{ minHeight: "300px" }} />
  );
}
