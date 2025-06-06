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

// app.use(cors({
//     // origin: "https://zaaya.netlify.app/", // Allow requests from your Netlify frontend
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is included
//     allowedHeaders: ["Content-Type", "Authorization", "token"] // Pass an array, not a string
//   }));
// app.use(cors({
//   origin: "https://zaaya-exclusive-for-women-vendor-da-phi.vercel.app/", // 
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "token"]


// }));


// const allowedOrigins = ["https://zaaya.netlify.app"];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "token"]
// }));

const allowedOrigins = ["https://zaaya.netlify.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true // important if using cookies or auth
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


