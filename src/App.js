import React from 'react'
import {Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import FindParking from './components/FindParking';
import Location from './components/Location';
import SelectSpot from './components/SelectSpot';
import Booking from './components/Booking';
import Payment from './components/Payment';

function App() {
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
      </Routes>
    </>
  );
}

export default App