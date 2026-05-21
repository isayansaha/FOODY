"use client";

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const driverIcon = new L.Icon({
  iconUrl: 'https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_my_location_24dp.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

interface MapProps {
  driverLocation: [number, number];
  destinationLocation: [number, number];
}

export default function Map({ driverLocation, destinationLocation }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const driverMarkerRef = useRef<L.Marker | null>(null);

  // 1. Initialize Map exactly once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create the map instance
    const map = L.map(mapContainerRef.current, { scrollWheelZoom: true, zoomControl: false }).setView(
      driverLocation, 
      15
    );
    mapInstanceRef.current = map;

    // Add Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Add static destination marker
    L.marker(destinationLocation, { icon: customIcon }).bindPopup('Customer Dropoff').addTo(map);

    // Cleanup on complete unmount
    return () => {
      map.remove();
      mapInstanceRef.current = null;
      driverMarkerRef.current = null;
    };
  }, []); // Empty dependency array ensures this only runs once on mount!

  // 2. Update Driver Location whenever it changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !driverLocation) return;

    if (!driverMarkerRef.current) {
      // Create driver marker if it doesn't exist
      driverMarkerRef.current = L.marker(driverLocation, { icon: driverIcon }).bindPopup('You are here').addTo(map);
    } else {
      // Animate marker to new position
      driverMarkerRef.current.setLatLng(driverLocation);
    }

    // Pan the camera to follow the driver
    map.setView(driverLocation, 15, { animate: true });
  }, [driverLocation]);

  return <div ref={mapContainerRef} className="h-full w-full relative z-0" />;
}
