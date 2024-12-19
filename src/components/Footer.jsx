import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-blue-600 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="space-y-4">
        <Link to="/" className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-white" />
          <span className="font-bold text-xl text-white">CUET Medical</span>
        </Link>
        <p className="text-gray-200">
          Comprehensive healthcare services for the CUET community.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/about" className="text-gray-100 hover:text-teal-300">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" className="text-gray-100 hover:text-teal-300">
              Services
            </Link>
          </li>
          <li>
            <Link to="/doctors" className="text-gray-100 hover:text-teal-300">
              Our Doctors
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-100 hover:text-teal-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Services</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/services/primary-care" className="text-gray-100 hover:text-teal-300">
              Primary Care
            </Link>
          </li>
          <li>
            <Link to="/services/emergency" className="text-gray-100 hover:text-teal-300">
              Emergency Services
            </Link>
          </li>
          <li>
            <Link to="/services/pharmacy" className="text-gray-100 hover:text-teal-300">
              Pharmacy
            </Link>
          </li>
          <li>
            <Link to="/services/counseling" className="text-gray-100 hover:text-teal-300">
              Counseling
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
        <ul className="space-y-2 text-gray-100">
          <li>Chittagong University of Engineering & Technology,Chittagong, Bangladesh</li>
          <li>Emergency: +880 123 456 789</li>
          <li>Email: medical@cuet.ac.bd</li>
        </ul>
      </div>
    </div>

    <div className="mt-2 pt-2 border-t border-gray-600">
      <p className="text-center text-gray-200">
        © {new Date().getFullYear()} CUET Medical Center. All rights reserved.
      </p>
    </div>
  </div>
</footer>


  );
};

export default Footer;