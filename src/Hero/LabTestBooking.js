import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Sample data for lab tests
const labTests = [
  {
    id: 1,
    name: 'Blood Test',
    description: 'A general blood test to check for various conditions.',
    price: '$30',
    link: '#',
  },
  {
    id: 2,
    name: 'Urine Test',
    description: 'A test to check for various urinary tract conditions.',
    price: '$20',
    link: '#',
  },
  {
    id: 3,
    name: 'X-Ray',
    description: 'An imaging test to check bones and tissues.',
    price: '$50',
    link: '#',
  },
  {
    id: 4,
    name: 'CT Scan',
    description: 'A detailed scan for internal organs and tissues.',
    price: '$150',
    link: '#',
  },
];

const LabTestBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    labTest: '',
    date: '',
    time: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Static available times
  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
  ];

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.labTest || !formData.date || !formData.time) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      toast.error('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    try {
      // Update the API URL to match backend URL and port
      const apiUrl = 'http://localhost:5000/api/labtest/bookings';

      // Make an API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Notify success
        toast.success('Lab test appointment booked successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          labTest: '',
          date: '',
          time: '',
          message: '',
        });
      } else {
        // Notify failure
        toast.error('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Toaster /> {/* Add this to display toasts */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Book a Lab Test</h1>
      <p className="mt-2 text-gray-600 text-sm sm:text-base">
        Fill out the form below to book a lab test. Choose the test, time, and provide your details.
      </p>

      {/* Lab Test Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name Input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border rounded-lg"
              pattern="[0-9]{10}"
              placeholder="1234567890"
            />
          </div>

          {/* Lab Test Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="labTest" className="text-sm font-medium text-gray-700">Select Lab Test</label>
            <select
              id="labTest"
              name="labTest"
              value={formData.labTest}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border rounded-lg"
            >
              <option value="">--Select--</option>
              {labTests.map((test) => (
                <option key={test.id} value={test.name}>
                  {test.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className="flex flex-col">
            <label htmlFor="date" className="text-sm font-medium text-gray-700">Select Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Time Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="time" className="text-sm font-medium text-gray-700">Select Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="mt-1 px-4 py-2 border rounded-lg"
            >
              <option value="">--Select--</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Message Input */}
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border rounded-lg"
              placeholder="Optional message for the lab"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full mt-6 px-6 py-3 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-full hover:bg-blue-700`}
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Lab Test'}
        </button>
      </form>
    </div>
  );
};

export default LabTestBooking;
