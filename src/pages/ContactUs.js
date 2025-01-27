import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// Import the image from the assets folder
import emergencyCareImage from '../assets/images/Contact Us.2625c50d13aedb11ddb7.png';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [setIsSubmitted] = useState(false); // Corrected state initialization

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before sending:', formData);

    try {
      const response = await axios.post('http://localhost:5000/api/contact/', formData, { withCredentials: true });
      console.log('Response:', response);
      // setIsSubmitted(true); // Now works correctly
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear the form
    } catch (error) {
      console.error('Error details:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Add the Toaster component */}
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Hero Section with Image */}
      <div className="mb-8">
        <img
          src={emergencyCareImage} // Use the imported image path
          alt="Emergency Care"
          className="w-full h-auto object-cover rounded-md"
        />
      </div>

      {/* Contact Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-base md:text-lg px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Our Contact Details
          </h2>
          <p className="mb-2">
            <strong>Phone:</strong> +91 73197 99463
          </p>
          <p className="mb-2">
            <strong>Email:</strong> mahuamedantahospital@gmail.com
          </p>
          <p className="mb-2">
            <strong>Address:</strong> Patel Bhavan Vishnu Chowk, Mahua
          </p>
          <p className="mt-4">
            Our team is available 24/7 for any urgent queries. Please don’t
            hesitate to reach out to us.
          </p>
        </div>

        {/* Contact Form */}
        <div className="px-4">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
