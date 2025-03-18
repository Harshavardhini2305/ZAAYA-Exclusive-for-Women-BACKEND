const express = require("express")
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors');



const app = express()

const PORT = process.env.PORT || 5500;

dotEnv.config();

app.use(cors({
    origin: "https://zaaya.netlify.app", // Allow requests from your Netlify frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is included
    allowedHeaders: ["Content-Type", "Authorization", "token"] // Pass an array, not a string
  }));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    console.log()
})

app.use(express.json()); // Ensure JSON parsing is enabled

//convering inputs to json formet
app.use(bodyParser.json());

//to create http request we usemiddleware
app.use('/vendor',vendorRoutes)

app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static(`uploads`));

app.listen(PORT,()=>{
    console.log(`server started and running at ${PORT}`)
});


app.use('/',(req,res)=>{
    res.send("<h1>WELCOME TO WOMENS SHOPPING")
})


