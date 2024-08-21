import mongoose from 'mongoose';




const mongoose_URL = 'mongodb+srv://aryan:aryan@cluster1.alqtnoa.mongodb.net/JobTask?retryWrites=true&w=majority'
const DB_connection = () => {
    mongoose.connect(mongoose_URL, {});
    mongoose.connection.on('connected', () => { console.log("db is connected"); })
    mongoose.connection.on('disconnected', () => { console.log("XXX db is disconnected XXX"); })
    mongoose.connection.on('error', () => { console.log("db is connected ----- error"); })

}

export default DB_connection;











