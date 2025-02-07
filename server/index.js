const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

const corOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};

app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corOptions));
app.use(cookieParser());

// const uri = "mongodb+srv://sarthokali0427:ftF4xz8A8HiAyWTK@cluster0.vsegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = "mongodb+srv://towshin:sabit11tushi05@cluster0.w4gv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("CUETMedico");
    const appointmentCollection = database.collection("appointmentform");

    // Post a new appointment
    app.post('/api/appointmentform', async (req, res) => {
        const body = req.body;
        console.log('Body:', body);
        body.createdAt = new Date();
        const result = await appointmentCollection.insertOne(body);
        if (result.insertedId) {
            res.status(200).json({ message: "Appointment successfully booked", appointment: body });
        } else {
            res.status(500).json({ message: "Error booking appointment" });
        }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});





// // // mongodb+srv://towshin:sabit11tushi05@cluster0.w4gv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// // // mongodb+srv://towshin:<db_password>@cluster0.w4gv9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// // const express = require('express');
// // const connectDB = require('./db.js');
// // const doctorsModel = require('./models/doctors.js');
// // const TestModel = require('./models/testlist.js');
// // const appointModel = require('./models/appointmentlist.js');

// // const cors = require('cors');
// // const app = express();
// // const mongoose = require('mongoose');


// // const corOptions ={

// //     origin: "http://localhost:5173",
// //     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
// //     credentials: true
// // }
// // app.use(cors(corOptions));
// // app.use(express.json());

// // connectDB();

// // app.get("/home", (req, res) => {
// //     console.log("Server is running!");
// //     res.json("Server is running!");
// // });
// // // Assuming this is in your server or index.js
// // app.post('/api/appointmentform', async (req, res) => {
    
// //     console.log("Request Body:", req.body);
// //     const { studentName, studentEmail, doctorId, appointmentDay, selectedTime } = req.body;
// //     if (!studentName || !studentEmail || !doctorId || !appointmentDay || !selectedTime) {
// //         return res.status(400).json({ message: "Missing required fields" });
// //      }
// //     try {
// //       const dateParts = appointmentDay.split('/');  
// //       const selectedDate = new Date(`${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${dateParts[2].padStart(2, '0')}`);
  
// //       if (isNaN(selectedDate.getTime())) {
// //         return res.status(400).json({ message: "Invalid appointment date" });
// //       }
  
// //       const selectedDay = selectedDate.toLocaleString('en-us', { weekday: 'long' });
  
// //     //   const doctor = await doctorsModel.findById(doctorId);
// //     //   if (!doctor) {
// //     //     return res.status(404).json({ message: "Doctor not found" });
// //     //   }
  
// //       const doctorAvailability = doctor.availability.find(slot => 
// //         slot.day === selectedDay && slot.timeSlot === selectedTime
// //       );
  
// //       if (!doctorAvailability) {
// //         return res.status(400).json({ message: `Doctor is not available on ${selectedDay} at ${selectedTime}` });
// //       }
  
// //       const newAppointment = new appointModel({
// //         studentName,
// //         studentEmail,
// //         doctorId,
// //         appointmentDay: selectedDay,  
// //         selectedTime
// //       });
  
// //       await newAppointment.save();
  
// //       return res.status(200).json({
// //         message: `Appointment successfully booked with Dr. ${doctor.name} on ${selectedDay} at ${selectedTime}`,
// //         appointment: newAppointment
// //       });
  
// //     } catch (error) {
// //       console.error(error);
// //       return res.status(500).json({ message: "Error booking appointment", error: error.message });
// //     }
// //   });
  
  

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
