import React, { useState } from "react";
import axios from "axios";
import img from "../../src/assets/images/appointment.png";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    aadhar: "",
    address: "",
    gender: "",
    reason: "",
    date: "",
    time: "",
    dateOfBirth: "",
    period: "AM",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required.";
    if (!formData.email.trim()) formErrors.email = "Email is required.";
    if (!formData.aadhar.trim()) formErrors.aadhar = "Aadhar number is required.";
    if (!formData.address.trim()) formErrors.address = "Address is required.";
    if (!formData.gender.trim()) formErrors.gender = "Gender is required.";
    if (!formData.reason.trim()) formErrors.reason = "Reason for appointment is required.";
    if (!formData.date.trim()) formErrors.date = "Appointment date is required.";
    if (!formData.time.trim()) formErrors.time = "Time is required.";
    if (!formData.dateOfBirth.trim()) formErrors.dateOfBirth = "Date of Birth is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // If no errors, return true
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(), // Convert date to ISO string
        dateOfBirth: new Date(formData.dateOfBirth).toISOString(), // Convert DOB to ISO string
      };

      // Send the form data to the backend API
      const response = await axios.post("http://localhost:5000/api/appointment", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from server:", response.data);

      if (response.status === 201) {
        toast.success("Appointment booked successfully!"); // Show success toast
        setFormData({
          name: "",
          email: "",
          aadhar: "",
          address: "",
          gender: "",
          reason: "",
          date: "",
          time: "",
          dateOfBirth: "",
          period: "AM",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`); // Show error toast
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <h2 className="text-lg md:text-2xl font-semibold text-center text-blue-600 mt-6 mb-6">
        Book an Appointment
      </h2>

      <div className="flex flex-wrap justify-center w-full max-w-6xl bg-white shadow-md rounded-md overflow-hidden">
        {/* Form Area */}
        <div className="w-full md:w-1/2 px-4 py-6">
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Aadhar */}
            <div className="mb-4">
              <label htmlFor="aadhar" className="block text-gray-700 font-medium">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadhar"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your Aadhar number"
              />
              {errors.aadhar && <p className="text-red-500 text-sm">{errors.aadhar}</p>}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your address"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Appointment Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-medium">
                Appointment Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Time */}
            <div className="mb-4 flex items-center space-x-4">
              <label htmlFor="time" className="block text-gray-700 font-medium">
                Time
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              >
                {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div className="mb-6">
              <label htmlFor="reason" className="block text-gray-700 font-medium">
                Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter the reason for the appointment"
              />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </form>
        </div>

        {/* Image Area */}
        <div className="w-full md:w-1/2 p-4">
          <img
            src={img}
            alt="Appointment Illustration"
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AppointmentPage;
