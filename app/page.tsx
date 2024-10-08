"use client";

import { useState, useEffect } from "react";
import EventMap from "@/components/EventMap";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm";
import LandingPage from "@/components/LandingPage";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
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

  if (showLanding) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Hyper-Local Event Discovery</h1>
        <Button
          onClick={() => setShowLanding(true)}
          className="text-blue-500 hover:underline"
        >
          Back to Home
        </Button>
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
