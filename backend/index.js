import express from 'express';          
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routes/user.route.js' 
import noteRouter from './routes/note.route.js' 


const app = express();
const PORT = process.env.PORT || 4000;
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));


app.use('/api/users', userRouter);
app.use('/api/notes', noteRouter);
// Start Server
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

