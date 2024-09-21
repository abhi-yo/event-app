import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        {icon}
        <h2 className="text-lg font-semibold ml-2 text-blue-300">{title}</h2>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <header className="text-center">
          <h1 className="text-5xl font-bold mb-2 text-blue-300">Hyper Local</h1>
          <p className="text-xl text-gray-400">
            Discover and manage events with ease
          </p>
        </header>

        <main className="space-y-4">
          <FeatureCard
            icon={<Calendar className="w-6 h-6 text-green-400" />}
            title="Schedule Events"
            description="Easily create and manage your events with our intuitive interface."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-pink-400" />}
            title="Connect with Attendees"
            description="Interact with participants and build your network."
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6 text-yellow-400" />}
            title="Discover Local Events"
            description="Find exciting events happening near you."
          />
        </main>

        <div className="text-center">
          <Button
            onClick={onGetStarted}
            className="px-8 py-2 bg-transparent border-2 border-blue-500 text-blue-400 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2024 Event App. All rights reserved.</p>
        <a
          href="https://github.com/abhi-yo/event-app"
          className="text-blue-400 hover:underline"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
