import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import DB_connection from './config/db.js';
const app = express();
dotenv.config()


app.use(cors());
app.use(json());

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT =  5000;
app.listen(PORT, async () => {
    try {
         DB_connection();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Database connection error:', error);
    }
});
