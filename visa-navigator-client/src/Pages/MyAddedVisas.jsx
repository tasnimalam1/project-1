import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loading from "../Component/Loading";
import Modal from "../Component/Modal";
import { AuthContext } from "../Provider/AuthProvider";

const MyAddedVisas = () => {
  const { user } = useContext(AuthContext);
  const [myVisas, setMyVisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);

  useEffect(() => {
    // Fetch visas added by the logged-in user
    if (user?.email) {
      fetch(
        `https://visa-navigator-server-theta.vercel.app/application/${user?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyVisas(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user's visas:", err);
          setIsLoading(false);
        });
    }
  }, [user]);

  // Handle Delete Visa
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://visa-navigator-server-theta.vercel.app/application/delete/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setMyVisas(myVisas.filter((visa) => visa._id !== id));
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "The visa has been deleted.", "success");
            }
          });
      }
    });
  };

  // Handle Update Visa
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedVisa = {
      ...selectedVisa,
      [e.target.name]: e.target.value,
    };
    fetch(
      `https://visa-navigator-server-theta.vercel.app/application/update/${selectedVisa._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVisa),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setMyVisas(
            myVisas.map((visa) =>
              visa._id === selectedVisa._id
                ? { ...selectedVisa, ...updatedVisa }
                : visa
            )
          );
          setIsModalOpen(false);
          Swal.fire("Success!", "Visa updated successfully!", "success");
        }
      });
  };

  if (isLoading) {
    <Loading></Loading>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Added Visas</h1>
      {myVisas?.length === 0 ? (
        <p className="text-center">You have no added visa.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myVisas.map((visa) => (
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
                <h2 className="text-xl font-bold mb-2">{visa.countryName}</h2>
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
                  <strong>Age Restriction:</strong>{" "}
                  {visa.ageRestriction || "None"}
                </p>
                <p>
                  <strong>Validity:</strong> {visa.validity}
                </p>
                <p>
                  <strong>Application Method:</strong> {visa.applicationMethod}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setSelectedVisa(visa);
                      setIsModalOpen(true);
                    }}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(visa._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Visa Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Update Visa">
          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            {/* Country Name */}
            <div className="col-span-1">
              <label className="block text-gray-600">Country Name</label>
              <input
                type="text"
                name="countryName"
                defaultValue={selectedVisa?.countryName}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    countryName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Country Image */}
            <div className="col-span-1">
              <label className="block text-gray-600">Country Image URL</label>
              <input
                type="text"
                name="countryImage"
                defaultValue={selectedVisa?.countryImage}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    countryImage: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Visa Type */}
            <div className="col-span-1">
              <label className="block text-gray-600">Visa Type</label>
              <select
                name="visaType"
                defaultValue={selectedVisa?.visaType}
                onChange={(e) =>
                  setSelectedVisa({ ...selectedVisa, visaType: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="Tourist visa">Tourist visa</option>
                <option value="Student visa">Student visa</option>
                <option value="Official visa">Official visa</option>
                <option value="Business visa">Business visa</option>
                <option value="Transit visa">Transit visa</option>
              </select>
            </div>

            {/* Processing Time */}
            <div className="col-span-1">
              <label className="block text-gray-600">
                Processing Time (days)
              </label>
              <input
                type="text"
                name="processingTime"
                defaultValue={selectedVisa?.processingTime}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    processingTime: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Fee */}
            <div className="col-span-1">
              <label className="block text-gray-600">Fee (USD)</label>
              <input
                type="number"
                name="fee"
                defaultValue={selectedVisa?.fee}
                onChange={(e) =>
                  setSelectedVisa({ ...selectedVisa, fee: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Validity */}
            <div className="col-span-1">
              <label className="block text-gray-600">Validity</label>
              <input
                type="text"
                name="validity"
                defaultValue={selectedVisa?.validity}
                onChange={(e) =>
                  setSelectedVisa({ ...selectedVisa, validity: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Application Method */}
            <div className="col-span-1">
              <label className="block text-gray-600">Application Method</label>
              <input
                type="text"
                name="applicationMethod"
                defaultValue={selectedVisa?.applicationMethod}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    applicationMethod: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Required Documents */}
            <div className="col-span-1">
              <label className="block text-gray-600">
                Required Documents (Comma Separated)
              </label>
              <input
                type="text"
                name="requiredDocuments"
                defaultValue={selectedVisa?.requiredDocuments?.join(", ")}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    requiredDocuments: e.target.value
                      .split(",")
                      .map((doc) => doc.trim()),
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-gray-600">Description</label>
              <textarea
                name="description"
                defaultValue={selectedVisa?.description}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Applicant's First Name */}
            <div className="col-span-1">
              <label className="block text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={selectedVisa?.firstName}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    firstName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Applicant's Last Name */}
            <div className="col-span-1">
              <label className="block text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                defaultValue={selectedVisa?.lastName}
                onChange={(e) =>
                  setSelectedVisa({ ...selectedVisa, lastName: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Age Restriction */}
            <div className="col-span-1">
              <label className="block text-gray-600">Age Restriction</label>
              <input
                type="number"
                name="ageRestriction"
                defaultValue={selectedVisa?.ageRestriction}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    ageRestriction: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Applied Date */}
            <div className="col-span-1">
              <label className="block text-gray-600">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                defaultValue={selectedVisa?.appliedDate}
                onChange={(e) =>
                  setSelectedVisa({
                    ...selectedVisa,
                    appliedDate: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Applicant's Email */}
            <div className="col-span-2">
              <label className="block text-gray-600">Applicant's Email</label>
              <input
                type="email"
                name="applicantEmail"
                Value={selectedVisa?.email}
                readOnly
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
              >
                Update Visa
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MyAddedVisas;
