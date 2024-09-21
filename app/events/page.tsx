"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EventMap from "@/components/EventMap";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Hyper-Local Event Discovery</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
      <div className="mb-4">
        <EventMap events={events} onLocationSelect={handleLocationSelect} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EventForm selectedLocation={selectedLocation} />
        <EventList events={events} />
      </div>
    </main>
  );
}
