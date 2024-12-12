import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "../Component/Modal";
import { AuthContext } from "../Provider/AuthProvider";

const VisaDetails = () => {
  const loadedData = useLoaderData();

  const {
    _id,
    countryImage,
    countryName,
    visaType,
    processingTime,
    requiredDocuments,
    description,
    ageRestriction,
    fee,
    validity,
    applicationMethod,
  } = loadedData;

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user } = useContext(AuthContext);

  // Utility function to get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    appliedDate: getCurrentDate(), // Set default applied date to today
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleApply = (e) => {
    e.preventDefault();

    const applicationData = {
      email: user?.email,
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      appliedDate: formData.appliedDate || "",
      fee: fee,
      visaId: _id,
      countryName: countryName,
      countryImage: countryImage,
      visaType: visaType,
      processingTime: processingTime,
      requiredDocuments: requiredDocuments,
      description: description,
      ageRestriction: ageRestriction,
      validity: validity,
      applicationMethod: applicationMethod,
    };

    // Save applicationData to the database
    fetch("https://visa-navigator-server-theta.vercel.app/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsModalOpen(false);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Visa application submitted successfully!",
            icon: "success",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an issue submitting your application. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <div className="container mx-auto py-10 px-4 md:w-2/3 mb-10">
      <h1 className="text-3xl text-center font-bold mb-6">Visa Details</h1>
      <h1 className="text-2xl font-bold mb-4">Country Name: {countryName}</h1>
      <img
        src={countryImage}
        alt={countryName}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <div className="text-gray-800 space-y-4 *:text-lg">
        <p>
          <strong>Visa Type:</strong> {visaType}
        </p>
        <p>
          <strong>Processing Time:</strong> {processingTime} days
        </p>
        <p>
          <strong>Required Documents:</strong> {requiredDocuments.join(", ")}
        </p>
        <p>
          <strong>Age Restriction:</strong> {ageRestriction || "None"}
        </p>
        <p>
          <strong>Fee:</strong> ${fee}
        </p>
        <p>
          <strong>Validity:</strong> {validity}
        </p>
        <p>
          <strong>Application Method:</strong> {applicationMethod}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
      </div>

      {/* Apply for Visa Button */}
      <button
        className="text-lg mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
        onClick={() => setIsModalOpen(true)}
      >
        Apply for the Visa
      </button>

      {/* Application Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Apply for Visa">
          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate} // Set to current date by default
                onChange={handleChange} // Update the formData state on change
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Fee</label>
              <input
                type="text"
                value={`$${fee}`}
                readOnly
                className="w-full px-3 py-2 border rounded bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
            >
              Apply
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default VisaDetails;
