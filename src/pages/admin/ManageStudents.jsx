import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        email: '',
        phone: '',
        bookletId: '',
        department: '',
        hallName: '',
        roomName: '',
        batch: '',
    });
    const [editingStudent, setEditingStudent] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch students from the API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/all-students'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleAddStudent = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const addedStudent = await response.json();
            setStudents([...students, addedStudent]);
            setNewStudent({
                name: '',
                email: '',
                phone: '',
                bookletId: '',
                department: '',
                hallName: '',
                roomName: '',
                batch: '',
            }); // Reset form
            setMessage('Student added successfully!');
        } catch (error) {
            console.error('Error adding student:', error);
            setMessage('Failed to add student. Please try again.');
        }
    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setNewStudent({ ...student });
    };

    const handleUpdateStudent = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/students/${editingStudent.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updatedStudent = await response.json();
            setStudents(students.map(student =>
                student.id === editingStudent.id ? updatedStudent : student
            ));
            setEditingStudent(null);
            setNewStudent({
                name: '',
                email: '',
                phone: '',
                bookletId: '',
                department: '',
                hallName: '',
                roomName: '',
                batch: '',
            }); // Reset form
            setMessage('Student updated successfully!');
        } catch (error) {
            console.error('Error updating student:', error);
            setMessage('Failed to update student. Please try again.');
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/students/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setStudents(students.filter(student => student.id !== id));
            setMessage('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            setMessage('Failed to delete student. Please try again.');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Manage Students</h1>
            {message && <p className="text-green-600">{message}</p>}
            <div className="mb-4">
                <h2 className="text-xl font-semibold">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newStudent.phone}
                        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Booklet ID"
                        value={newStudent.bookletId}
                        onChange={(e) => setNewStudent({ ...newStudent, bookletId: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={newStudent.department}
                        onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Hall Name"
                        value={newStudent.hallName}
                        onChange={(e) => setNewStudent({ ...newStudent, hallName: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Room Name"
                        value={newStudent.roomName}
                        onChange={(e) => setNewStudent({ ...newStudent, roomName: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Batch"
                        value={newStudent.batch}
                        onChange={(e) => setNewStudent({ ...newStudent, batch: e.target.value })}
                        className="border p-2"
                    />
                </div>
                <button onClick={editingStudent ? handleUpdateStudent : handleAddStudent} className="bg-blue-600 text-white px-4 py-2 rounded">
                    {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Student List</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Booklet ID</th>
                        <th className="py-2 px-4 border-b">Department</th>
                        <th className="py-2 px-4 border-b">Hall Name</th>
                        <th className="py-2 px-4 border-b">Room Name</th>
                        <th className="py-2 px-4 border-b">Batch</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{student.name}</td>
                            <td className="py-2 px-4 border-b">{student.email}</td>
                            <td className="py-2 px-4 border-b">{student.phone}</td>
                            <td className="py-2 px-4 border-b">{student.bookletId}</td>
                            <td className="py-2 px-4 border-b">{student.department}</td>
                            <td className="py-2 px-4 border-b">{student.hallName}</td>
                            <td className="py-2 px-4 border-b">{student.roomName}</td>
                            <td className="py-2 px-4 border-b">{student.batch}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => handleEditStudent(student)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 flex items-center">
                                    <FaEdit className="mr-1" /> Edit
                                </button>
                                <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                                    <FaTrash className="mr-1" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageStudents; 