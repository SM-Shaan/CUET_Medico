const mongoose= require('mongoose');

const connectDB= async () =>{
    try {
        // const conn= await mongoose.connect('mongodb+srv://towshin:sabit11tushi05@cluster0.w4gv9.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster0')
        const conn= await mongoose.connect('mongodb+srv://sarthokali0427:ftF4xz8A8HiAyWTK@cluster0.vsegh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
            console.log(`MongoDB Connected: ${conn.connection.host}`);

        
    }
    catch(error){
        console.error(error);
        process.exit(1)
    }
}
module.exports=connectDB