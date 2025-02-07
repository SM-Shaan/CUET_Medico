import { useAuth0 } from "@auth0/auth0-react";
import { Stethoscope } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";

// const navigate = useNavigate();


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();

//   const namespace = 'https://myapp.example.com/';
//   const userRoles = user?.[`${namespace}roles`] || [];

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // navigate('/home', { replace: true });
      const offset = window.scrollY;
      setSticky(offset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate]);

  const navItems = [
    { path: "/home", title: "Home" },
    // { path: "/my-job", title: "My Jobs", roles: ["Recruiter",] },
    { path: "/appointments", title: "Appointments" },
    // { path: "/doctors", title: "Doctors", roles: ["Doctor", "Admin"] },
    { path: "/doctors", title: "Doctors" },
    { path: "/blog", title: "Blog" },
    { path: "/contact", title: "Contact" },
    // { path: "/dashboard", title: "Admin Dashboard", roles: ["Admin"] },
  ];

//   const hasRole = (roles) => roles?.some(role => userRoles.includes(role));

  return (
    <header className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 top-0 left-0 right-0 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out" : ""}`}>
      <nav className="flex justify-between items-center py-6">
        <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
                <Stethoscope className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-primary">CUET Medical</span>
            </Link>
        </div>

        <ul className="hidden md:flex gap-12">
          {isAuthenticated ? (
            <>
              {/* {navItems.map(({ path, title, roles }) => ( */}
              {navItems.map(({ path, title }) => (
                // (!roles || hasRole(roles)) && (
                  <li key={path} className="text-base text-primary">
                    <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                      {title}
                    </NavLink>
                  </li>
                // )
              ))}
              <div className="">
                <NavLink to='/dashmenu' className="text-xs text-slate-500">{user.name}</NavLink>
                {/* <p className="text-[10px] text-gray-400">{userRoles.join(', ')}</p> */}
              </div>
              <button className="bg-blue text-white p-2 hover:bg-purple-900 rounded-lg" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button>
            </>
          ) : (
            <li>
              <button className="bg-blue text-white p-2 hover:bg-purple-900 rounded-lg" onClick={() => loginWithRedirect()}>Log In</button>
            </li>
          )}
        </ul>

        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {
        //   navItems.map(({ path, title, roles }) => (
          navItems.map(({ path, title }) => (
            // (!roles || hasRole(roles)) && (
              <li key={path} className="text-base text-white first:text-blue py-1">
                <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                  {title}
                </NavLink>
              </li>
            // )
          ))
          }
          {isAuthenticated ? (
            <>
              <li className="text-base text-white py-1">
                <NavLink to="/dashmenu/dashboard" className="text-xs text-slate-500">{user.name}</NavLink>
              </li>
              <li className="text-base text-white py-1">
                {/* <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button> */}
                <button className='text-black bg-blue' onClick={() => logout()}>Log Out</button>
              </li>
            </>
          ) : (
            <li className="text-base bg-black text-white py-1">
              <button className='text-black bg-blue' onClick={() => loginWithRedirect()}>Log In</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Menu, X, Stethoscope, Bell, User } from "lucide-react";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [showProfileMenu, setShowProfileMenu] = useState(false);
//     const [user, setUser] = useState(null); // State to hold user data
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser)); // Parse and set user data
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('user');
//         setUser(null); // Clear user state
//         navigate('/login');
//     };

//     return (
//         <nav className="bg-white shadow-lg dark:bg-gray-900">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <Link to="/" className="flex items-center space-x-2">
//                             <Stethoscope className="h-8 w-8 text-primary" />
//                             <span className="font-bold text-xl text-primary">CUET Medical</span>
//                         </Link>
//                     </div>

//                     <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
//                         <Link to="/" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300">Home</Link>
//                         <Link to="/appointments" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300">Appointments</Link>
//                         <Link to="/doctors" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300">Doctors</Link>
//                         <Link to="/blog" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300">Blog</Link>
//                         <Link to="/contact" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium dark:text-gray-300">Contact</Link>
//                     </div>

//                     <div className="flex items-center space-x-4">
//                         {user ? ( // If user is logged in
//                             <>
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
//                                         className="relative text-gray-600 hover:text-primary focus:outline-none"
//                                     >
//                                         <Bell className="h-6 w-6" />
//                                         {/* Notification count can be added here */}
//                                     </button>
//                                     {showNotifications && (
//                                         <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-10">
//                                             {/* Notification content */}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
//                                         className="flex items-center text-gray-600 hover:text-primary focus:outline-none"
//                                     >
//                                         <User className="h-6 w-6" />
//                                     </button>
//                                     {showProfileMenu && (
//                                         <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
//                                             <div className="px-4 py-2 text-sm text-gray-700">
//                                                 <strong>{user.name}</strong>
//                                                 <p className="text-gray-500">{user.role}</p>
//                                             </div>
//                                             <Link
//                                                 to="/dashboard"
//                                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                             >
//                                                 Dashboard
//                                             </Link>
//                                             <button
//                                                 onClick={handleLogout}
//                                                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                             >
//                                                 Log Out
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </>
//                         ) : ( // If user is not logged in
//                             <>
//                                 <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
//                                 <Link to="/signup" className="text-gray-600 hover:text-primary">Signup</Link>
//                             </>
//                         )}
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
//                         >
//                             {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {isOpen && (
//                 <div className="md:hidden">
//                     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                         <Link to="/" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
//                         <Link to="/appointments" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Appointments</Link>
//                         <Link to="/doctors" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Doctors</Link>
//                         <Link to="/blog" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Blog</Link>
//                         <Link to="/contact" className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
//                         <button className="w-full mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
//                             Sign In
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;
