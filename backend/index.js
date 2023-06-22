const express = require('express');
const dbconnect = require("./db/config");
const cors = require("cors");

const app = express();

const userRoutes = require("./Routes/userRoutes")
const locationRoutes = require("./Routes/locationRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/user",userRoutes);
app.use("/api/location",locationRoutes);


app.listen(5000,() => console.log("Server running in port 5000."));

