import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupForm = () => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');

  const handleSignup = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
      appState: { email, password, user_metadata: { role } },
    });
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="applicant">Applicant</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupForm;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { auth } from '../firebase/firebase'; // Ensure you have the correct path to your Firebase config
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// const Signup = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('student'); // Default role
//     const [error, setError] = useState(''); // State to hold error messages
//     const [loading, setLoading] = useState(false); // Loading state
//     const navigate = useNavigate();


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(''); // Reset error state before attempting signup
//         setLoading(true); // Set loading state to true
//         try {
//             // Create user with email and password
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user; // Get the user object

//             // Save user data to local storage
//             const userInfo = {
//                 uid: user?.uid, name, email, role
//             }
//             localStorage.setItem('user', JSON.stringify(userInfo));
//         setCustomUserClaims(user.uid, { role }); // Set user role

//             // Redirect to homepage
//             navigate('/');
//         } catch (error) {
//             console.error("Error signing up:", error);
//             setError(error.message); // Set error message to state
//         } finally {
//             setLoading(false); // Reset loading state
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
//             <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
//                 <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>
//                 {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium mb-1">Role</label>
//                     <select
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="admin">Admin</option>
//                         <option value="doctor">Doctor</option>
//                         <option value="student">Student</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200" disabled={loading}>
//                     {loading ? 'Signing Up...' : 'Signup'}
//                 </button>
//                 <div className="mt-4 text-center">
//                     <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default Signup; 