require('dotenv').config()
const express = require('express')
const app = express()
const dbConfig = require("./config/dbConfig")
const userRoute = require("./routes/userRoutes")
const cors = require('cors');



app.use(cors());
app.use(express.json())
app.use('/api/user',userRoute)



const feedback = require('./routes/user.feedback.js');
app.use('/feedback', feedback);


const medicine_add = require('./routes/medicine.add.js');
app.use('/medicine_add', medicine_add);


const brands = require('./routes/brand.js');
app.use('/brands', brands);


const channelBooking = require('./routes/channel.booking.js');
app.use('/channelBooking', channelBooking);

const addDoctor = require('./routes/DoctorsAdd.js');
app.use('/addDoctor', addDoctor);


const MedicalCenter = require('./routes/medicalCenter.js');
app.use('/medicalCenter', MedicalCenter);

const payment = require('./routes/payment.js');
app.use('/payment', payment);






const port  = process.env.PORT|| 5000;

app.listen(port,()=>console.log(`Backend Node Server start on port ${port}`))