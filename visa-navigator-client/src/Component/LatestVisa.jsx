import React, { useEffect, useState } from "react";
import { Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const LatestVisas = () => {
  const [latestVisas, setLatestVisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch latest visas (last 6 sorted by creation date)
  useEffect(() => {
    const fetchLatestVisas = async () => {
        const response = await fetch("https://visa-navigator-server-theta.vercel.app/visas/latest");
        if (!response.ok) {
          throw new Error("Failed to fetch visas");
        }
        const data = await response.json();
        setLatestVisas(data);
        setIsLoading(false);
      
    };

    fetchLatestVisas();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto text-center py-10">
        <Loading></Loading>
      </div>
    );
  }



  return (
    <div className="container mx-auto py-10 px-4">
      <Slide triggerOnce direction="left">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Visas</h1>
      </Slide>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestVisas.length > 0 ? (
          latestVisas.map((visa) => (
            <div
              key={visa._id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={visa.countryImage}
                alt={visa.countryName}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Country: {visa.countryName}</h2>
                <p>
                  <strong>Visa Type:</strong> {visa.visaType}
                </p>
                <p>
                  <strong>Processing Time:</strong> {visa.processingTime} days
                </p>
                <p>
                  <strong>Fee:</strong> ${visa.fee}
                </p>
                <p>
                  <strong>Validity:</strong> {visa.validity}
                </p>
                <p>
                  <strong>Application method:</strong> {visa.applicationMethod}
                </p>
                <button
                  onClick={() => navigate(`/visa-details/${visa._id}`)}
                  className="mt-4 w-full bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No visas available at the moment.</p>
        )}
      </div>
      <div className="text-center mt-10">
        <button
          className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-accent transition"
          onClick={() => navigate("/all-visas")}
        >
          See All Visas
        </button>
      </div>
    </div>
  );
};

export default LatestVisas;
