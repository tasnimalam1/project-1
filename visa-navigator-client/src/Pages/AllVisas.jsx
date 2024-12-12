import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AllVisaCard from "../Component/AllVisaCard";

const AllVisas = () => {
  const visas = useLoaderData(); // Array of all visas
  const [selectedVisaType, setSelectedVisaType] = useState("All"); // State for the selected visa type

  // Get unique visa types for the dropdown
  const visaTypes = ["All", ...new Set(visas.map((visa) => visa.visaType))];

  // Filter visas based on the selected type
  const filteredVisas =
    selectedVisaType === "All"
      ? visas
      : visas?.filter((visa) => visa.visaType === selectedVisaType);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-10">{selectedVisaType}: {filteredVisas.length}</h1>

      {/* Dropdown for Filtering */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedVisaType}
          onChange={(e) => setSelectedVisaType(e.target.value)}
          className="px-4 bg-accent py-2 border rounded-md shadow-md focus:ring-2 focus:ring-primary focus:outline-none"
        >
          {visaTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Visa Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-8">
        {filteredVisas.map((visa) => (
          <AllVisaCard key={visa._id} visa={visa}></AllVisaCard>
        ))}
      </div>
    </div>
  );
};

export default AllVisas;
