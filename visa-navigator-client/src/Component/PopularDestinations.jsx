import React from "react";
import { Slide } from "react-awesome-reveal";

const PopularDestinations = () => {

  const destinations = [
    {
      country: "Japan",
      image: "https://i.ibb.co.com/rskccqQ/Japan.jpg", // Replace with actual image URL
      description:
        "Experience the vibrant culture, stunning landscapes, and world-class cuisine of Japan.",
    },
    {
      country: "Italy",
      image: "https://i.ibb.co.com/4TCtWL6/Italy.jpg",
      description:
        "Discover the rich history, art, and delicious food in one of Europe's most iconic destinations.",
    },
    {
      country: "Maldives",
      image: "https://i.ibb.co.com/3RRZqRj/Maldives.jpg",
      description:
        "Relax in paradise with pristine beaches, clear waters, and luxury resorts.",
    },
    {
      "country": "Australia",
      "image": "https://i.ibb.co.com/s971dSf/Australia.jpg",
      "description": "Explore the stunning Outback, vibrant cities, and iconic landmarks like the Sydney Opera House."
    },
    {
      "country": "Brazil",
      "image": "https://i.ibb.co.com/mhCH0KN/Brazil.jpg",
      "description": "Immerse yourself in Brazil's lively culture, breathtaking rainforests, and the famous Carnival festival."
    },
    {
      "country": "Switzerland",
      "image": "https://i.ibb.co.com/5BkT4LS/Switzerland.jpg",
      "description": "Enjoy the majestic Alps, serene lakes, and picturesque villages in Switzerland."
    }
  ];

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
      <Slide triggerOnce direction="down">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Popular Destinations
        </h2>
      </Slide>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={destination.image}
                alt={destination.country}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{destination.country}</h3>
                <p className="text-gray-700">{destination.description}</p>
                <button
                  className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary w-full"
                  onClick={() => alert("Start application for " + destination.country)}
                >
                  Start Application
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
