import { Link } from "react-router-dom";
import {
  FaFirstAid,
  FaPhone,
  FaCalendar,
  FaPills,
  FaHeartbeat,
  FaSyringe,
  FaStethoscope,
  FaAmbulance,
  FaBookMedical,
} from "react-icons/fa";

const Home = () => {
  const doctors = [
    { name: "Dr. John Doe", date: "Dec 16, 2024", duration: "9:00 AM - 5:00 PM" },
    { name: "Dr. Jane Smith", date: "Dec 16, 2024", duration: "10:00 AM - 6:00 PM" },
  ];
  const articles = [
    {
      title: "Understanding Your Blood Pressure",
      description: "Learn about blood pressure, its impact on health, and tips to manage it.",
      link: "/articles/blood-pressure",
      image: "https://www.uclahealth.org/sites/default/files/styles/landscape_3x2_018000_720x480/public/images/81/woman-with-high-blood-pressure-istock-1296154975-3.jpg?f=42b0fc66&itok=q8ps3G8S",
    },
    {
      title: "Mental Health Awareness",
      description: "How to maintain mental health, manage stress, and seek help when needed.",
      link: "/articles/mental-health",
      image: "https://images.unsplash.com/photo-1527236438218-d82077ae1f85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
    {
      title: "Nutrition for a Healthy Lifestyle",
      description: "Essential nutrients your body needs and how to incorporate them into your diet.",
      link: "/articles/nutrition",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    },
  ];



  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            CUET Medical Center
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-up">
            Dedicated to ensuring the health and well-being of the CUET community with modern facilities and expert care.
          </p>
          <div className="space-x-4">
            <Link
              to="/appointmentform"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:bg-gray-100 animate-pulse"
            >
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="inline-block border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">

        <section className="bg-white py-8 px-4 sm:px-6 lg:px-8 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">

            {/* About Us Section */}
            <div className="w-3/4 md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">About CUET Medical Center</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                CUET Medical Center is dedicated to providing top-notch healthcare to the CUET community. Our team of professionals ensures you receive the best care possible.
              </p>

              {/* Stack of Images
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1593720213429-ebd6d3b2f5a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="Doctor" />
                </div>


              </div> */}
            </div>

            {/* Available Doctors Section */}
            <div className="w-1/4 md:w-1/2">
              <h2 className="text-2xl font-semibold text-indigo-800 text-center md:text-left mb-6">Currently Available Doctors</h2>

              {/* Sliding Doctor Cards */}
              <div className="overflow-hidden relative">
                <div className="flex animate-slide">
                  {doctors.map((doctor, index) => (
                    <div key={index} className="flex-shrink-0 w-full md:w-auto bg-gray-50 p-6 rounded-lg shadow-lg mx-2 transition-all duration-300 ease-in-out transform hover:scale-105">
                      <div className="text-center md:text-left">
                        <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.date}</p>
                      </div>
                      <span className="block text-center md:text-left text-gray-900 mt-2">{doctor.duration}</span>
                    </div>
                  ))}
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 opacity-50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Latest Health Articles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Latest Health Articles</h2>
            <p className="text-gray-600">
              Discover insights, tips, and the latest updates to help you stay healthy and informed.
            </p>
          </div>

          {/* Articles Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <Link
                    to={article.link}
                    className="inline-block text-teal-600 hover:text-teal-800 text-sm font-medium"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          <div className="text-center mt-12">
            <button
              className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-300"
              onClick={() => alert('Load more articles!')}
            >
              See More
            </button>
          </div>
        </div>
      </section>


      {/* Working Hours */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Working Hours
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                  <span>Saturday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                  <span>Sunday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="pt-4">
                  <p className="text-primary font-semibold text-blue-600">
                    * Emergency services available 24/7
                  </p>
                </div>
              </div>
            </div>
            {/* Emergency Contact */}
            <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-12 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="max-w-5xl mt-5 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                {/* Left Column: Heading & Description */}
                <div className="text-center md:text-left space-y-4">
                  <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                    Emergency? <br />
                    <span className="text-yellow-300">Call Us Now!</span>
                  </h3>
                </div>

                {/* Right Column: Contact Info & Button */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                  {/* Phone Icon & Number */}
                  <div className="flex items-center space-x-4 animate-pulse">
                    <FaPhone className="h-10 w-10 text-yellow-300" />
                    <span className="text-2xl font-bold text-white">+880 123 456 789</span>
                  </div>
                </div>
              </div>
              {/* Floating Element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 bg-opacity-40 rounded-full blur-lg animate-spin-slow"></div>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
