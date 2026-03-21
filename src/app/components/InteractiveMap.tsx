import { useEffect, useRef } from "react";
import L from "leaflet";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Operator {
  id: string;
  name: string;
  specialty: string;
  location: string;
  country: string;
  city: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  price: number;
  isLive: boolean;
  image: string;
  activeViewers?: number;
}

interface InteractiveMapProps {
  operators: Operator[];
  userLocation?: { lat: number; lng: number } | null;
  onOperatorClick?: (operator: Operator) => void;
}

export default function InteractiveMap({
  operators,
  userLocation,
  onOperatorClick,
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create map with world wrap disabled
    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      scrollWheelZoom: true,
      worldCopyJump: false, // Disable world wrap jumping
      maxBounds: [[-90, -180], [90, 180]], // Limit panning to one world
      maxBoundsViscosity: 1.0, // Make bounds solid
    });

    // Add realistic colorful tile layer from OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',
      maxZoom: 19,
      noWrap: true, // Prevent tile wrapping
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update operator markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create markers for each operator
    operators.forEach((operator) => {
      const iconHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          ${operator.isLive ? `
            <div style="position: absolute; width: 64px; height: 64px; background: rgba(139, 92, 246, 0.3); border-radius: 50%; animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          ` : ''}
          <div style="position: relative; width: 48px; height: 48px; border-radius: 50%; border: 4px solid ${operator.isLive ? '#8b5cf6' : '#6b7280'}; overflow: hidden; background: white; box-shadow: ${operator.isLive ? '0 0 20px rgba(139, 92, 246, 0.5)' : 'none'};">
            <img src="${operator.image}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          ${operator.isLive ? `
            <div style="position: absolute; top: -4px; right: -4px; width: 16px; height: 16px; background: #ef4444; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
              <div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
            </div>
          ` : ''}
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker-icon',
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48],
      });

      const marker = L.marker([operator.coordinates.lat, operator.coordinates.lng], { icon })
        .addTo(mapRef.current!);

      // Create popup content
      const popupContent = `
        <div class="p-2" style="min-width: 200px;">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-primary" style="border: 2px solid #8b5cf6; border-radius: 50%; overflow: hidden; width: 48px; height: 48px;">
              <img src="${operator.image}" alt="${operator.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div class="flex-1">
              <p class="font-semibold text-sm" style="font-weight: 600; font-size: 0.875rem; margin: 0;">${operator.name}</p>
              <p class="text-xs text-primary" style="font-size: 0.75rem; color: #8b5cf6; margin: 0;">${operator.specialty}</p>
            </div>
          </div>
          <p class="text-xs text-muted-foreground mb-2" style="font-size: 0.75rem; color: #6b7280; margin: 0 0 8px 0;">
            📍 ${operator.city}, ${operator.country}
          </p>
          <div class="flex items-center justify-between text-xs mb-2" style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; margin: 0 0 8px 0;">
            <div class="flex items-center gap-1" style="display: flex; align-items: center; gap: 4px;">
              <span style="color: #fbbf24;">⭐</span>
              <span class="font-medium" style="font-weight: 500;">${operator.rating}</span>
            </div>
            <div class="text-primary font-bold" style="color: #8b5cf6; font-weight: 700;">$${operator.price}/hr</div>
          </div>
          ${operator.isLive && operator.activeViewers ? `
            <div class="flex items-center gap-1 text-xs bg-red-500 text-white px-2 py-1 rounded-full justify-center font-semibold" style="display: flex; align-items: center; gap: 4px; font-size: 0.75rem; background: #ef4444; color: white; padding: 4px 8px; border-radius: 9999px; justify-content: center; font-weight: 600;">
              <div class="w-2 h-2 bg-white rounded-full animate-pulse" style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
              <span>LIVE</span>
              <span>•</span>
              <span>👁 ${operator.activeViewers}</span>
            </div>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      // Add click handler
      marker.on('click', () => {
        if (onOperatorClick) {
          onOperatorClick(operator);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit bounds to show all operators
    if (operators.length > 0) {
      const bounds = L.latLngBounds(
        operators.map(op => [op.coordinates.lat, op.coordinates.lng] as [number, number])
      );
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
    }
  }, [operators, onOperatorClick]);

  // Update user location marker
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove existing user marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    // Add new user marker if location exists
    if (userLocation) {
      const userIconHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 64px; height: 64px; background: rgba(34, 197, 94, 0.2); border-radius: 50%; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"></div>
          <div style="width: 40px; height: 40px; background: rgba(34, 197, 94, 0.4); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
            <div style="width: 24px; height: 24px; background: #22c55e; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"></div>
          </div>
        </div>
      `;

      const userIcon = L.divIcon({
        html: userIconHtml,
        className: 'user-location-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(mapRef.current);

      userMarker.bindPopup(`
        <div class="text-center p-1" style="text-align: center; padding: 4px;">
          <p class="font-semibold text-sm" style="font-weight: 600; font-size: 0.875rem; margin: 0;">Your Location</p>
          <p class="text-xs text-muted-foreground" style="font-size: 0.75rem; color: #6b7280; margin: 0;">
            ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}
          </p>
        </div>
      `);

      userMarkerRef.current = userMarker;
    }
  }, [userLocation]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full z-0" style={{ background: "#0f172a" }} />

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }

        .custom-marker-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .user-location-icon {
          background: transparent !important;
          border: none !important;
        }

        .leaflet-popup-content-wrapper {
          background: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2) !important;
          padding: 0 !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }

        .leaflet-popup-tip {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
        }

        .leaflet-container {
          font-family: inherit !important;
          background: #0f172a !important;
        }

        .leaflet-control-zoom {
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 8px !important;
          overflow: hidden;
        }

        .leaflet-control-zoom a {
          background: hsl(var(--card)) !important;
          color: hsl(var(--foreground)) !important;
          border-bottom: 1px solid hsl(var(--border)) !important;
        }

        .leaflet-control-zoom a:hover {
          background: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }

        .leaflet-control-attribution {
          background: hsl(var(--background) / 0.8) !important;
          color: hsl(var(--muted-foreground)) !important;
          font-size: 10px !important;
          padding: 2px 4px !important;
        }

        .leaflet-control-attribution a {
          color: hsl(var(--primary)) !important;
        }
      `}</style>
    </div>
  );
}