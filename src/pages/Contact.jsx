import React from 'react';

const ContactPage = () => {
  const workers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Maintenance Worker',
      image: 'https://images.unsplash.com/photo-1582719478189-5f22c89abbd9?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Housekeeping Staff',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 3,
      name: 'Robert Brown',
      role: 'Electrician',
      image: 'https://images.unsplash.com/photo-1533227268428-e3dfbfb5e911?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 4,
      name: 'Alice Johnson',
      role: 'Gardener',
      image: 'https://images.unsplash.com/photo-1514790193030-c89d266d5a9d?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 5,
      name: 'Michael Lee',
      role: 'Security Guard',
      image: 'https://images.unsplash.com/photo-1609874907228-36fc5e43b8a2?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 6,
      name: 'Emily Davis',
      role: 'Administrative Assistant',
      image: 'https://images.unsplash.com/photo-1598807507395-dede93a04f5a?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 7,
      name: 'David Wilson',
      role: 'Receptionist',
      image: 'https://images.unsplash.com/photo-1609874907228-36fc5e43b8a2?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 8,
      name: 'Sarah Martinez',
      role: 'Nurse',
      image: 'https://images.unsplash.com/photo-1598807507395-dede93a04f5a?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      id: 9,
      name: 'William Clark',
      role: 'Pharmacist',
      image: 'https://images.unsplash.com/photo-1609874907228-36fc5e43b8a2?auto=format&fit=crop&w=200&h=200&q=80',
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-12 text-center bg-gradient-to-r from-blue-300 to-blue-500 text-white">
        <h1 className="text-4xl font-bold">Contact CUET Medical Center</h1>
        <p className="text-lg mt-2">We’re here to assist you. Get in touch with us through the details below.</p>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Meet Our Support Staff</h2>
          <p className="text-lg">The people who work behind the scenes to keep our facility running smoothly</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-white p-6 rounded-lg shadow-lg text-center w-60">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{worker.name}</h3>
              <p className="text-gray-600">{worker.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Send Us a Message</h2>
        </div>
        <form className="max-w-4xl mx-auto mt-8 grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-lg font-semibold text-gray-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Your Message"
              className="p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Submit Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
