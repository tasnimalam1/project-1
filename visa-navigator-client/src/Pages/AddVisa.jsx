import React, { useState } from "react";
import Swal from "sweetalert2";

const AddVisa = () => {
  const [formValues, setFormValues] = useState({
    countryImage: "",
    countryName: "",
    visaType: "Tourist visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      requiredDocuments: checked
        ? [...prev.requiredDocuments, value]
        : prev.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send data to server
    fetch("https://visa-navigator-server-theta.vercel.app/visas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Visa Added Successfully",
            icon: "success",
            confirmButtonText: "Close",
          });

          setFormValues({
            countryImage: "",
            countryName: "",
            visaType: "Tourist visa",
            processingTime: "",
            requiredDocuments: [],
            description: "",
            ageRestriction: "",
            fee: "",
            validity: "",
            applicationMethod: "",
          });

          // Reset all checkboxes
          const checkboxes = document.querySelectorAll("input[type=checkbox]");
          checkboxes.forEach((checkbox) => (checkbox.checked = false));
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-10 mb-10 px-4">
      <div className="container mx-auto p-8 rounded-lg shadow-2xl max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Add Visa</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country Image */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="countryImage"
              >
                Country Image URL
              </label>
              <input
                type="url"
                id="countryImage"
                value={formValues.countryImage}
                onChange={(e) =>
                  setFormValues({ ...formValues, countryImage: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Country Name */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="countryName">
                Country Name
              </label>
              <input
                type="text"
                id="countryName"
                value={formValues.countryName}
                onChange={(e) =>
                  setFormValues({ ...formValues, countryName: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter country name"
                required
              />
            </div>

            {/* Visa Type */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="visaType">
                Visa Type
              </label>
              <select
                id="visaType"
                value={formValues.visaType}
                onChange={(e) =>
                  setFormValues({ ...formValues, visaType: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Tourist visa">Tourist Visa</option>
                <option value="Student visa">Student Visa</option>
                <option value="Official visa">Official Visa</option>
                <option value="Business visa">Business visa</option>
                <option value="Transit visa">Transit visa</option>
              </select>
            </div>

            {/* Processing Time */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="processingTime"
              >
                Processing Time
              </label>
              <input
                type="text"
                id="processingTime"
                value={formValues.processingTime}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    processingTime: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter processing time"
                required
              />
            </div>

            {/* Required Documents */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">
                Required Documents
              </label>
              <div className="space-y-2">
                {[
                  "Valid passport",
                  "Visa application form",
                  "Recent passport-sized photograph",
                  "Travel itinerary",
                  "Proof of financial means",
                ].map((doc) => (
                  <label key={doc} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={doc}
                      onChange={handleCheckboxChange}
                      className="rounded"
                    />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({ ...formValues, description: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                rows="4"
                placeholder="Enter visa description"
              ></textarea>
            </div>

            {/* Age Restriction */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="ageRestriction"
              >
                Age Restriction
              </label>
              <input
                type="number"
                id="ageRestriction"
                value={formValues.ageRestriction}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    ageRestriction: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter age restriction"
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="fee">
                Fee
              </label>
              <input
                type="number"
                id="fee"
                value={formValues.fee}
                onChange={(e) =>
                  setFormValues({ ...formValues, fee: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter visa fee"
              />
            </div>

            {/* Validity */}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="validity">
                Validity
              </label>
              <input
                type="text"
                id="validity"
                value={formValues.validity}
                onChange={(e) =>
                  setFormValues({ ...formValues, validity: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter validity period"
              />
            </div>

            {/* Application Method */}
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="applicationMethod"
              >
                Application Method
              </label>
              <input
                type="text"
                id="applicationMethod"
                value={formValues.applicationMethod}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    applicationMethod: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter application method"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-secondary transition"
            >
              Add Visa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisa;
