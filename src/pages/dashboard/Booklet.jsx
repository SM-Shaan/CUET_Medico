import React, { useState } from "react";

const StudentBooklet = () => {
  // Mock data
  const students = [
    { id: 1, name: "John Doe", department: "CSE", age: 21, batch: "2020", profilePic: "/images/s1.png" },
    { id: 2, name: "Jane Smith", department: "EEE", age: 22, batch: "2019", profilePic: "/images/s2.png" },
    { id: 3, name: "Michael Brown", department: "BME", age: 23, batch: "2021", profilePic: "/images/s3.jpg" },
    { id: 4, name: "Emma Johnson", department: "CSE", age: 22, batch: "2020", profilePic: "/images/s1.png" },
    { id: 5, name: "Sophia Williams", department: "EEE", age: 21, batch: "2019", profilePic: "/images/s2.png" },
    { id: 6, name: "William Jones", department: "BME", age: 23, batch: "2021", profilePic: "/images/s3.jpg" },
  ];

  const [filter, setFilter] = useState({ name: "", department: "", batch: "", date: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Mock Medical History Data
  const medicalHistory = {
    1: [
      { date: "2024-01-15", visit: "Routine Checkup", doctor: "Dr. Smith", notes: "All vitals normal." },
      { date: "2023-12-10", visit: "Flu Treatment", doctor: "Dr. Patel", notes: "Prescribed flu medication." },
    ],
    2: [{ date: "2023-11-05", visit: "Allergy Test", doctor: "Dr. Lee", notes: "Identified pollen allergy." }],
    3: [{ date: "2024-02-20", visit: "Eye Checkup", doctor: "Dr. Taylor", notes: "Mild myopia detected." }],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardClick = (id) => setSelectedStudent(id);

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(filter.name.toLowerCase());
    const matchesDepartment = student.department.toLowerCase().includes(filter.department.toLowerCase());
    const matchesBatch = student.batch.includes(filter.batch);
    return matchesName && matchesDepartment && matchesBatch;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Booklet</h1>

        {/* Filter Section */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Search by name..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={filter.name}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Search by department..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={filter.department}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="batch"
            placeholder="Search by batch..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={filter.batch}
            onChange={handleFilterChange}
          />
        </div>

        {/* Booklet Cards */}
        {!selectedStudent && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleCardClick(student.id)}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={student.profilePic}
                    alt={student.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{student.name}</h2>
                    <p className="text-gray-600">{student.department}</p>
                    <p className="text-sm text-gray-500">Batch: {student.batch}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Medical History */}
        {selectedStudent && (
          <div>
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-blue-600 hover:underline"
            >
              Back to Booklet
            </button>
            <h2 className="text-2xl font-bold text-gray-800 my-4">
              Medical History for {students.find((s) => s.id === selectedStudent)?.name}
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              {medicalHistory[selectedStudent]?.length > 0 ? (
                medicalHistory[selectedStudent].map((record, index) => (
                  <div
                    key={index}
                    className="border-b last:border-none py-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">{record.visit}</h3>
                      <p className="text-gray-600 text-sm">{record.notes}</p>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      <p>{record.date}</p>
                      <p>{record.doctor}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No medical history available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentBooklet;
