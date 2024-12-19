import React from 'react';

// Example services
const services = [
  { id: 1, name: 'General Consultation', icon: '/icons/doctor.svg' },
  { id: 2, name: 'Specialist Consultation', icon: '/icons/specialist.svg' },
  { id: 3, name: 'Psychiatry Consultation', icon: '/icons/psychiatrist.svg' },
  { id: 4, name: 'Dental Consultation', icon: '/icons/dental.svg' },
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
          <a href="/appointmentform" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-100 animate-pulse">Book Appointment</a>
        </div>
      </section>

      {/* Available Services Section */}
      <section id="services" className="py-12 bg-white">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-8">Our Medical Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {services.map(service => (
            <div key={service.id} className="bg-blue-50 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <img src={service.icon} alt={service.name} className="h-16 mb-4" />
              <h3 className="text-xl font-semibold text-blue-800">{service.name}</h3>
              <p className="text-gray-600 mt-2">Schedule a consultation with a professional in this field.</p>
              <a href="#book" className="mt-4 text-blue-600 hover:text-blue-800">Book Now</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OnlineAppointmentPage;
