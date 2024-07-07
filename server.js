import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRouts.js';
import dotenv from 'dotenv';
import multer from "multer";
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads' directory

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Connect to MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB Atlas', err));

app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.use('/api/user', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
 