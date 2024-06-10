require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const jobSeekerRoutes = require('./routes/jobSeekers');
const employerRoutes = require('./routes/employers');
const adminRoutes = require('./routes/admin');
const notificationRoutes = require('./routes/notifications');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/jobseekers', jobSeekerRoutes);
app.use('/employers', employerRoutes);
app.use('/admin', adminRoutes);
app.use('/notifications', notificationRoutes);

app.use(errorHandler);

app.get("/", (req,res)=>{
    res.send("hello server")
})

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

startServer();
