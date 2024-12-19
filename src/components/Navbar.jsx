import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Stethoscope, Bell, User, CheckCircle, Info, AlertTriangle } from "lucide-react";

const formatTime = (date) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString([], options);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Appointments", href: "/appointments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];
  
  const user = {
    name: "John Doe",
    role: "Admin",
    dashboard: "/dashboard",
  };

  const notifications = [
    { id: 1, message: "Your appointment with Dr. Smith is confirmed.", timestamp: Date.now() },
    { id: 2, message: "Lab results are available in your portal.", timestamp: Date.now() - 3600000 }, // 1 hour ago
    { id: 3, message: "Your upcoming check-up is scheduled for tomorrow.",  timestamp: Date.now() - 86400000 }, // 1 day ago
  ];

  const handleNotificationClick = (id) => {
    setShowNotifications(false); // Close the notification dropdown when an item is clicked
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-primary">CUET Medical</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Notification and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className="relative text-gray-600 hover:text-primary focus:outline-none"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              </button>
              {showNotifications &&  (
                // showProfileMenu = false

                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-10">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{notification.message}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No new notifications
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Profile Icon */}
            <div className="relative">
              <button
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                className="flex items-center text-gray-600 hover:text-primary focus:outline-none"
              >
                <User className="h-6 w-6" />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <strong>{user.name}</strong>
                    <p className="text-gray-500">{user.role}</p>
                  </div>
                  <Link
                    to={user.dashboard}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
