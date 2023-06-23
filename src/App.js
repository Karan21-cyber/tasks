import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FindParking from "./components/FindParking";
import Location from "./components/Location";
import SelectSpot from "./components/SelectSpot";
import Booking from "./components/Booking";
import Payment from "./components/Payment";
import Bill from "./components/Bill";
import Completion from "./components/Completion";
import Dashboard from "./components/admin/Dashboard";
import { ParkingState } from "./contextProvider/ParkingProvider";


function App() {

  const {user} = ParkingState();
  
  if(user && (user.role === "admin")){
    return (<Dashboard />);
  }
  else{
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<FindParking />} />
          <Route path="/location/:location_id" element={<Location />} />
          <Route path="/selectlocation/:spot_id" element={<SelectSpot />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </>
    );
  }
}

export default App;
