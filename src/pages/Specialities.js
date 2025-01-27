import React from 'react';
import Layout from '../components/Layout';
import burnImage from '../assets/images/burn.jpg';
import poisonImage from '../assets/images/toxic.jpg';
import gynecologyImage from '../assets/images/gynecology.jpg';
import fractureImage from '../assets/images/Fracture.jpg';
import traumaImage from '../assets/images/traumatic.jpg';
import emergencyImage from '../assets/images/EmergencyR.jpg';
import pediatricImage from '../assets/images/pediatricImage.jpg';
import surgeryImage from '../assets/images/Surgery.jpg';
import medicineImage from '../assets/images/medicineImage.jpg';
import criticalCareImage from '../assets/images/criticalCareImage.jpg';

// Define specialties array
const specialties = [
  { name: 'Burn Treatment', image: burnImage, description: 'Comprehensive care for burn injuries', link: '/BurnTreatment' },
  { name: 'Poisoning and Toxicology', image: poisonImage, description: 'Emergency treatment for poisoning cases', link: '/PoisoningToxicology' },
  { name: 'Gynecology, Obstetrics, and Maternity', image: gynecologyImage, description: 'Specialized care for women\'s health', link: '/GynecologyObstetrics' },
  { name: 'Fracture Management', image: fractureImage, description: 'Advanced bone fracture care', link: '/FractureManagement' },
  { name: 'Trauma and Injury Care', image: traumaImage, description: 'Emergency care for injuries', link: '/TraumaCare' },
  { name: 'Emergency Response', image: emergencyImage, description: 'Immediate medical care during emergencies', link: '/EmergencyResponse' },
  { name: 'Pediatric Care', image: pediatricImage, description: 'Expert care for children\'s health', link: '/PediatricCare' },
  { name: 'General Surgery', image: surgeryImage, description: 'Surgical care for various conditions', link: '/GeneralSurgery' },
  { name: 'Internal Medicine', image: medicineImage, description: 'Comprehensive internal health care', link: '/InternalMedicine' },
  { name: 'Critical Care Units', image: criticalCareImage, description: 'Care for critically ill patients', link: '/CriticalCare' },
];

const Specialities = () => (
  <Layout>
    <section className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 relative">
      <div className="w-full max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800">
          Our 24/7 Medical Services
        </h2>
        <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-600">
          Comprehensive medical care for every situation, available at any hour.
        </p>
      </div>

      {/* Grid for specialties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full px-2 sm:px-4 mt-10">
        {specialties.map((specialty) => (
          <div
            key={specialty.name}
            className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 bg-white"
          >
            {/* Uniform height for image */}
            <div
              className="h-32 sm:h-40 md:h-44 lg:h-48 w-full bg-center"
              style={{
                backgroundImage: `url(${specialty.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div className="flex-grow flex flex-col justify-between p-4">
              <h4 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-800 text-center">
                {specialty.name}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">
                {specialty.description}
              </p>

              {/* Read More Button with Arrow */}
              <a
                href={specialty.link}
                className="mt-4 text-blue-500 hover:text-blue-700 flex items-center justify-center"
              >
                <span>Read More</span>
                <span className="ml-1 text-xl">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Specialities;
