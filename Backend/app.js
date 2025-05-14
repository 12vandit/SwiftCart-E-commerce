const express = require('express');
var cors = require('cors')
const ConnectDB = require('./config/db')
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("uploads"));

app.use(require("./routes/userRouter"));
app.use(require("./routes/bannerRouter"));
app.use(require("./routes/categoryRouter"));
app.use(require("./routes/productRouter"));
app.use(require("./routes/contactRouter"));
app.use(require("./routes/dashboardRouter"));
app.use(require("./routes/frontregisterlogin"));
app.use(require("./routes/frontContactRouter"));
app.use(require("./routes/cartRouter"));
app.use(require("./routes/paymentRouter"));
app.use(require("./routes/orderRouter"));



ConnectDB().then(()=>{
        app.listen(process.env.PORT,() => {
        console.log("Server start Successfully!");
        console.log("Server is running",process.env.PORT)
    })
})

  