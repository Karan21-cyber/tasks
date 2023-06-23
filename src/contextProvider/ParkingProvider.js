import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ParkingContext = createContext();

function ParkingProvider({ children }) {
  const [user, setUser] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedSpace, setSelectedSpace] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));    
    setUser(userInfo);
    
    // console.log(userInfo);

  }, [navigate]);

  

  return (
    <ParkingContext.Provider
      value={{
        user,
        setUser,
        role, setRole,
        selectedLocation,
        setSelectedLocation,
        selectedSpace,
        setSelectedSpace,
        selectedSlot,
        setSelectedSlot,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export default ParkingProvider;

export const ParkingState = () => {
  return useContext(ParkingContext);
};
