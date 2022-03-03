import React, { useEffect, useState } from "react";

import Nav from "./components/Nav";
import Rides from "./components/Rides";
import UtilityBar from "./components/UtilityBar";

export default function App() {
  const [rideData, setRideData] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/rides");

        if (!res.ok) throw new Error("New Error");
        const data = await res.json();
        setRideData(data);

        // States
        const statesArray = data.map((obj) => obj.state);
        setStates(statesArray);

        // City
        const cityArray = data.map((obj) => obj.state);
        setCities(cityArray);
      } catch (error) {
        console.log(error.msg);
      }
    }
    fetchData();
  }, []);
  console.log(rideData);

  const renderRides = rideData.map((ride, index) => (
    <Rides
      key={index + 1}
      id={ride.id}
      city={ride.city}
      date={ride.date}
      destinationStationCode={ride.destination_station_code}
      mapUrl={ride.map_url}
      originStationCode={ride.origin_station_code}
      state={ride.state}
      stationPath={[ride.station_path.toString()]}
    />
  ));
  return (
    <main className='container'>
      <Nav />
      <div className='app-wrap'>
        <UtilityBar states={states} cities={cities} />
        {renderRides}
      </div>
    </main>
  );
}
