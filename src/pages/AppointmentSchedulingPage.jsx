import React from 'react';
import { Link } from 'react-router-dom';
import { FaStethoscope, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '../components/Footer';

// Example services
const services = [
  { id: 1, name: 'General Consultation', description: 'Comprehensive health check-ups and consultations.' },
  { id: 2, name: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents.' },
  { id: 3, name: 'Cardiology', description: 'Expert care for heart-related conditions.' },
  { id: 4, name: 'Dermatology', description: 'Diagnosis and treatment of skin disorders.' },
];

const OnlineAppointmentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-300 to-blue-500 text-white" style={{ backgroundImage: `url("https://as1.ftcdn.net/v2/jpg/02/89/60/96/1000_F_289609649_SayyqhWUJoVj3roYfRty2sWYEipZ2n0L.jpg")` }}>
        <div className="absolute inset-0 py-12 text-center bg-gradient-to-r from-blue-300 to-blue-500 text-white opacity-50"></div>
        <div className="relative z-10 px-6 md:px-12">
          <h1 className="text-4xl font-bold mb-4">Book Your Online Appointment</h1>
          <p className="text-lg mb-6">Consult with top doctors from the comfort of your home</p>
        </div>
      </section>

      {/* Available Services Section */}
      <section id="services" className="py-12 bg-white">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Our Medical Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {services.map(service => (
            <div key={service.id} className="bg-blue-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <FaStethoscope className="h-16 mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Patient Resources Section */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Patient Resources</h2>
        <div className="max-w-4xl mx-auto text-gray-600">
          <p className="mb-4">We provide various resources to help you prepare for your visit:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><Link to="/patient-forms" className="text-blue-600 hover:underline">Download Patient Forms</Link></li>
            <li><Link to="/insurance-info" className="text-blue-600 hover:underline">Insurance Information</Link></li>
            <li><Link to="/health-tips" className="text-blue-600 hover:underline">Health Tips and Advice</Link></li>
          </ul>
        </div>
      </section>

      {/* Telehealth Information Section */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Telehealth Services</h2>
        <div className="max-w-4xl mx-auto text-gray-600">
          <p className="mb-4">Our telehealth services allow you to consult with our doctors from the comfort of your home. Here's how to prepare:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ensure you have a stable internet connection.</li>
            <li>Find a quiet space for your consultation.</li>
            <li>Have your medical history and any relevant documents ready.</li>
          </ul>
        </div>
      </section>

      {/* Emergency Contact Information Section */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Emergency Contact</h2>
        <div className="max-w-4xl mx-auto text-gray-600 text-center">
          <p className="mb-4">For emergencies, please contact us immediately:</p>
          <div className="flex justify-center items-center space-x-4">
            <FaPhone className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">+880 123 456 789</span>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <FaEnvelope className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">info@cuetmedicalcenter.edu</span>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold">What should I bring to my appointment?</h3>
              <p className="text-gray-600">Please bring your ID, insurance card, and any relevant medical records.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-semibold">How can I contact the medical center?</h3>
              <p className="text-gray-600">You can reach us at (123) 456-7890 or email us at info@cuetmedicalcenter.edu.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OnlineAppointmentPage;
