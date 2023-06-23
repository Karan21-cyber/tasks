const express = require('express');
const dbconnect = require("./db/config");
const cors = require("cors");

const app = express();

const userRoutes = require("./Routes/userRoutes")
const locationRoutes = require("./Routes/locationRoutes");
const spaceRoutes = require("./Routes/spaceRoutes");
const reserveRoutes = require("./Routes/reserveRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/user",userRoutes);
app.use("/api/location",locationRoutes);
app.use("/api/space",spaceRoutes)
app.use("/api/reserve",reserveRoutes);
app.use("/api/payment",paymentRoutes);


app.listen(5000,() => console.log("Server running in port 5000."));

