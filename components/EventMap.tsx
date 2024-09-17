"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Event {
  _id: string;
  title: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
}

interface EventMapProps {
  events: Event[];
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function EventMap({ events, onLocationSelect }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [selectionMarker, setSelectionMarker] =
    useState<google.maps.Marker | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current && !map) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        });
        setMap(newMap);

        newMap.addListener("click", (e: google.maps.MapMouseEvent) => {
          const clickedLat = e.latLng?.lat();
          const clickedLng = e.latLng?.lng();
          if (clickedLat && clickedLng && onLocationSelect) {
            onLocationSelect(clickedLat, clickedLng);
            placeSelectionMarker(e.latLng!);
          }
        });
      }
    });
  }, [onLocationSelect]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));

      // Add new markers for events
      const newMarkers = events.map((event) => {
        return new google.maps.Marker({
          position: {
            lat: event.location.coordinates[1],
            lng: event.location.coordinates[0],
          },
          map: map,
          title: event.title,
        });
      });
      setMarkers(newMarkers);
    }
  }, [map, events]);

  const placeSelectionMarker = (latLng: google.maps.LatLng) => {
    if (selectionMarker) {
      selectionMarker.setMap(null);
    }
    const newMarker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue icon for selection
    });
    setSelectionMarker(newMarker);
  };

  return <div ref={mapRef} className="w-full h-[400px]" />;
}
