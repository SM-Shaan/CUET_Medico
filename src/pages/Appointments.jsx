import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedStartTime, setSelectedStartTime] = useState('');
  // const [selectedEndTime, setSelectedEndTime] = useState('');

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    studentName: '',
    studentID: '',
    // bookletID: '',
    department: '',
    hall: '',
    batchNo: '',
    email: '',
    // phone: '',
  });
  const [appointmentType, setAppointmentType] = useState('');
  const [transferType, setTransferType] = useState('');

  const doctors = [
    { id: 1, name: 'Rupona Das', designation: 'Medicine', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'Sadia Sabrina', designation: 'Medicine', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'Abul Hashem', designation: 'Gastroenterologist', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200' },
  ];
  
  const navigate = useNavigate();

  const handleTimeSelection = (timeSlot) => {
    setSelectedTime(timeSlot);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentDetails = {
        studentName: studentInfo.studentName,
        studentID: studentInfo.studentID,
        studentEmail: studentInfo.email,
        studentDepartment: studentInfo.department,
        studentHall: studentInfo.hall,
        studentBatchNo: studentInfo.batchNo,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorDesignation: selectedDoctor.designation,
        appointmentDay: selectedDate,
        selectedTime: selectedTime
    };

    console.log(appointmentDetails);

    try {
        const response = await fetch('http://localhost:5000/api/appointmentform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentDetails),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert(data.message);
            // navigate('/appointments');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('An error occurred while booking your appointment.');
    }
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Appointment Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Appointment Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Student Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Student Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Student ID</label>
                  <input
                    type="text"
                    value={studentInfo.studentID}
                    onChange={(e) => setStudentInfo({ ...studentInfo, studentID: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm font-medium mb-1">Booklet ID</label>
                  <input
                    type="text"
                    value={studentInfo.bookletID}
                    onChange={(e) => setStudentInfo({ ...studentInfo, bookletID: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  /> */}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={studentInfo.department}
                    onChange={(e) => setStudentInfo({ ...studentInfo, department: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hall</label>
                  <input
                    type="text"
                    value={studentInfo.hall}
                    onChange={(e) => setStudentInfo({ ...studentInfo, hall: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Batch No.</label>
                  <input
                    type="text"
                    value={studentInfo.batchNo}
                    onChange={(e) => setStudentInfo({ ...studentInfo, batchNo: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={studentInfo.phone}
                    onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  />
                </div> */}
              </div>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Select a Doctor</label>
              <select
                value={selectedDoctor ? selectedDoctor.id : ''}
                onChange={(e) => {
                  const selected = doctors.find(doctor => doctor.id === parseInt(e.target.value));
                  setSelectedDoctor(selected);
                }}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Choose a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.designation}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Information (Display after selecting) */}
            {selectedDoctor && (
              <div className="bg-gray-50 p-4 rounded-md shadow-md mt-4">
                <h3 className="font-semibold mb-2">Doctor Information</h3>
                <div className="flex items-center space-x-4">
                  <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h4 className="text-lg font-medium">{selectedDoctor.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDoctor.designation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Appointment Date and Time */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1">Select Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border rounded-md pl-10"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Select Time</label>
              <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)} // Update the selected time slot
                  className="w-full p-2 border rounded-md pl-10"
                >
                  <option value="">Choose a time</option>
                  <option value="9 AM - 4 PM">9 AM - 4 PM</option>
                  <option value="3 PM - 9 PM">3 PM - 9 PM</option>
                  <option value="9 PM - 9 AM">9 PM - 9 AM</option>
                </select>


                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
