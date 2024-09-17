"use client";

import { useState, useEffect } from "react";
import EventMap from "../components/EventMap";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";

export default function Home() {
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
      <h1 className="text-3xl font-bold mb-4">Hyper-Local Event Discovery</h1>
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
