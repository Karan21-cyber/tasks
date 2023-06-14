const express = require('express');
const cors = require("cors");
const app = express();

const userRoutes = require("./Routes/userRoutes")
const parkingRoutes = require("./Routes/parkingRoutes");


app.use(express.json());
app.use(cors());

app.use("/api/user",userRoutes);
app.use("/api/parking",parkingRoutes);


app.listen(5000);