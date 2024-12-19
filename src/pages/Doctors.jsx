import React, { useState } from 'react';
import { FaStethoscope, FaStar, FaSearch, FaCalendarAlt, FaHeart, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const doctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiology', rating: 4, available: '9 AM - 5 PM', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatology', rating: 5, available: '10 AM - 6 PM', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'Dr. Michael Chen', specialization: 'Cardiology', rating: 3, available: '8 AM - 4 PM', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 4, name: 'Dr. Emily Brown', specialization: 'Psychiatry', rating: 4, available: '11 AM - 7 PM', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200' },
];

const Doctors = () => {
    const [search, setSearch] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedSpecialization ? doctor.specialization === selectedSpecialization : true) &&
        (selectedRating ? doctor.rating >= selectedRating : true)
    );

    return (
        <div className="bg-gradient-to-r from-blue-100 via-blue-200 to-white min-h-screen">
            {/* Hero Section */}
            <section
                className="h-screen flex items-center justify-center relative bg-cover bg-center"
                // Provide  a background image for doctors of a medical cnneter
                style={{
                    backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/01/38/63/26/1000_F_138632656_V6qMgqGkROC606StfhSOXgbGRw62R04n.jpg')",
                }}

            >
                <div className="absolute inset-0 bg-blue-600 bg-opacity-40"></div>
                <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto px-6 relative z-10">
                    <div className="text-center md:text-left md:w-1/2 -ml-10">
                        <h1 className="text-5xl font-bold mb-4 text-white">Meet Your Healthcare Provider</h1>
                        <p className="text-lg mb-6 text-gray-200">
                            Find the right doctor for your needs. Whether it’s a routine check-up or an emergency, we’re here to help.
                        </p>
                        <p className="text-sm mb-8 text-gray-300">Our experts are available for consultations today. Book your appointment now!</p>
                        <div className="space-x-4">
                            <button className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-100 animate-pulse">
                                Book an Appointment
                            </button>
                            <button className="bg-gray-200 text-black py-2 px-6 rounded-full hover:bg-gray-300 transition-all duration-300">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="hidden-ml-4 md:block ">
                        <img
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400"
                            alt="Doctor"
                            className="rounded-full shadow-2xl border-4 border-white"
                        />
                    </div>
                </div>
            </section>

            {/* Filtering Section */}
            <section className="py-12">
                <div
                    className="text-center mb-8 py-8 px-4"

                >
                    <h2 className="text-4xl font-bold mb-4">Find the Best Doctors</h2>
                    <p className="text-lg text-teal-800" >
                        Use the filters to find the best healthcare provider for your needs
                    </p>
                </div>


                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
                    {/* Search */}
                    
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            className="p-3 rounded-full border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                            placeholder="Search Doctors..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Specialization */}
                    <div className="w-full md:w-1/3">
                        <select
                            className="p-3 rounded-full border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                            value={selectedSpecialization}
                            onChange={(e) => setSelectedSpecialization(e.target.value)}
                        >
                            <option value="">Select Specialization</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Psychiatry">Psychiatry</option>
                        </select>
                    </div>

                    {/* Rating */}
                    <div className="w-full md:w-1/3">
                        <div className="flex items-center space-x-2">
                            <select
                                className="p-3 rounded-full border border-gray-300 w-full focus:ring-2 focus:ring-blue-400"
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                            >
                                <option value={0}>Rating</option>
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doctors List */}
            <section className="py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex flex-col items-center">
                                <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
                                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{doctor.specialization}</p>
                                <div className="flex items-center mb-2">
                                    <FaStar className="text-yellow-400" />
                                    <span className="ml-2">{doctor.rating} Stars</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">
                                    <FaCalendarAlt className="inline-block mr-1" /> Available: {doctor.available}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    <FaPhoneAlt className="inline-block mr-1" /> +1 234 567 890
                                    <br />
                                    <FaEnvelope className="inline-block mr-1" /> example@clinic.com
                                </p>
                                <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition-all duration-300">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Doctors;
