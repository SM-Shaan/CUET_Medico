import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MedicalHistoryPage = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 5; // Number of entries to display per page

    const bookletEntries = [
        { date: "2023-09-15", visitType: "General Consultation", notes: "Routine check-up.", medications: ["Lisinopril - 10 mg", "Metformin - 500 mg"], followUp: "Next appointment in 6 months.", doctorNotes: "Patient is stable." },
        { date: "2023-08-20", visitType: "Cardiology Consultation", notes: "Follow-up on heart condition.", medications: ["Atenolol - 50 mg"], followUp: "Monitor blood pressure.", doctorNotes: "Increase exercise." },
        { date: "2023-07-10", visitType: "Dermatology Consultation", notes: "Skin rash treatment.", medications: ["Hydrocortisone - 1%"], followUp: "Check in 2 weeks.", doctorNotes: "Avoid sun exposure." },
        { date: "2023-06-05", visitType: "Annual Physical Exam", notes: "All tests normal.", medications: [], followUp: "Annual check-up next year.", doctorNotes: "Maintain healthy lifestyle." },
        { date: "2023-05-15", visitType: "Nutrition Consultation", notes: "Diet plan discussed.", medications: [], followUp: "Review diet in 1 month.", doctorNotes: "Focus on balanced meals." },
        { date: "2023-04-10", visitType: "Allergy Consultation", notes: "Allergy tests performed.", medications: ["Antihistamine - 10 mg"], followUp: "Follow-up in 1 month.", doctorNotes: "Avoid allergens." },
        // Add more entries as needed
    ];

    const filteredEntries = bookletEntries
        .filter(entry => {
            const entryDate = new Date(entry.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            const matchesDate = (!startDate || entryDate >= start) && (!endDate || entryDate <= end);
            const matchesSearch = entry.visitType.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  entry.notes.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesDate && matchesSearch;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

    // Pagination logic
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

    const handleEntryClick = (entry) => {
        setSelectedEntry(entry);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Medical History</h1>

            <div className="flex mb-4 space-x-4">
                <div className="flex-1">
                    <label htmlFor="search" className="block text-gray-700">Search:</label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border rounded p-2 w-full"
                        placeholder="Search by visit type or notes"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="startDate" className="block text-gray-700">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="endDate" className="block text-gray-700">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="sortOrder" className="block text-gray-700">Sort by Date:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border rounded p-2 w-full"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <ul className="space-y-2">
                {currentEntries.map((entry, index) => (
                    <li key={index} className="border p-4 rounded mb-2 cursor-pointer hover:bg-gray-100" onClick={() => handleEntryClick(entry)}>
                        <h3 className="font-semibold">{entry.visitType} on {entry.date}</h3>
                        <p className="text-gray-600">Notes: {entry.notes}</p>
                        <p className="text-gray-600">Medications: {entry.medications.join(", ")}</p>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="self-center">Page {currentPage} of {totalPages}</span>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Detailed Entry Modal */}
            {selectedEntry && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Details for {selectedEntry.visitType}</h2>
                        <p><strong>Date:</strong> {selectedEntry.date}</p>
                        <p><strong>Notes:</strong> {selectedEntry.notes}</p>
                        <p><strong>Medications:</strong> {selectedEntry.medications.join(", ")}</p>
                        <p><strong>Follow-Up:</strong> {selectedEntry.followUp}</p>
                        <p><strong>Doctor's Notes:</strong> {selectedEntry.doctorNotes}</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setSelectedEntry(null)}>Close</button>
                    </div>
                </div>
            )}

            <Link to="/dashmenu/student" className="text-blue-600 hover:underline mt-4 block">Back to Dashboard</Link>
        </div>
    );
};

export default MedicalHistoryPage; 