import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [rating, setRating] = useState(0);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [weekdays, setWeekdays] = useState([]);
    const [availability, setAvailability] = useState({
        Monday: '',
        Tuesday: '',
        Wednesday: '',
        Thursday: '',
        Friday: '',
        Saturday: '',
        Sunday: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, designation, rating, phone, email, image, weekdays, availability }),
            });

            if (!response.ok) {
                const errorData = await response.text(); // Get the response as text
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
            }

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                navigate('/doctor-info');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error submitting doctor data:', error);
            alert('An error occurred: ' + error.message);
        }
    };

    const handleWeekdayChange = (e) => {
        const value = e.target.value;
        setWeekdays(prev => 
            prev.includes(value) ? prev.filter(day => day !== value) : [...prev, value]
        );
    };

    const handleAvailabilityChange = (day, time) => {
        setAvailability(prev => ({
            ...prev,
            [day]: time
        }));
    };

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Doctor's Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Doctor's Name" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Designation</label>
                <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-5)" min="1" max="5" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Available Weekdays</label>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day}>
                        <input 
                            type="checkbox" 
                            value={day} 
                            checked={weekdays.includes(day)} 
                            onChange={handleWeekdayChange} 
                        />
                        <label className="ml-2">{day}</label>
                        {weekdays.includes(day) && (
                            <input 
                                type="text" 
                                placeholder={`Available Time for ${day}`} 
                                value={availability[day]} 
                                onChange={(e) => handleAvailabilityChange(day, e.target.value)} 
                                className="ml-4 p-2 border rounded" 
                            />
                        )}
                    </div>
                ))}
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Doctor</button>
            {/* <button type="button" onClick={() => navigate('/doctor-info')} className="bg-red-600 text-white px-4 py-2 rounded ml-2">Cancel</button> */}
        </form>
    );
};

export default AddDoctor; 