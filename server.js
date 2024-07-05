import express from 'express';
import mongoose, { connect } from 'mongoose';
import userRoutes from './routes/userRouts.js';
import dotenv from 'dotenv';

dotenv.config();



const app =express();
const port =5000;

app.use(express.json({ extended: true }));

app.use(express.urlencoded({ extended: true }));

// connected to mongoDb atlas
const uri=process.env.MONGO_URI;
mongoose.connect(uri).then(()=>console.log('Connected to mongoAtlas')).catch(err=>console.error('Could not connect to MongoDB Atlas', err));


app.get('/', (req, res) => {
    res.send('Hello this is e commerce web side backend by Subhadip and Aniket ');
  });

  
 app.use('/api/user',userRoutes);




app.listen(port,()=>{
    console.log(`Server is running on port  http://localhost:${port}`)
});