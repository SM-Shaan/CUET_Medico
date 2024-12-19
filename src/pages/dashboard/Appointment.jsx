import React, { useState } from "react";
import { Link, useHref } from "react-router-dom";

const AppointmentOverview = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctor: "Dr. Smith",
      date: "2024-12-20",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Jane Roe",
      doctor: "Dr. Wilson",
      date: "2024-12-21",
      time: "1:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      patientName: "Alice Johnson",
      doctor: "Dr. Taylor",
      date: "2024-12-22",
      time: "3:00 PM",
      status: "Canceled",
    },
  ]);

  const [filters, setFilters] = useState({ doctor: "", status: "", date: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleAction = (id, action) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status: action } : appointment
      )
    );
  };

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      (!filters.doctor || appointment.doctor === filters.doctor) &&
      (!filters.status || appointment.status === filters.status) &&
      (!filters.date || appointment.date === filters.date)
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Appointment Overview</h1>
        <p className="text-gray-600">Manage and track all appointments.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Appointments", value: appointments.length },
          {
            label: "Completed",
            value: appointments.filter((a) => a.status === "Completed").length,
          },
          {
            label: "Pending",
            value: appointments.filter((a) => a.status === "Pending").length,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-700">{card.label}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 shadow rounded-lg mb-6 flex items-center space-x-4">
        <select
          name="doctor"
          value={filters.doctor}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Doctors</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Wilson">Dr. Wilson</option>
          <option value="Dr. Taylor">Dr. Taylor</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Canceled">Canceled</option>
        </select>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Appointment Table */}
      <div className="bg-white p-4 shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Patient Name</th>
              <th className="p-4">Doctor</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{appointment.patientName}</td>
                <td className="p-4">{appointment.doctor}</td>
                <td className="p-4">{appointment.date}</td>
                <td className="p-4">{appointment.time}</td>
                <td className="p-4">{appointment.status}</td>
                <td className="p-4 space-x-2">
                  {appointment.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(appointment.id, "Completed")}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => handleAction(appointment.id, "Canceled")}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <Link
                    to={"/dashboard/appointmentdetails/"}
                    onClick={() => useHref("/dashboard/appointments")}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentOverview;
