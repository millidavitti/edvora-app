import React, { useEffect, useState } from "react";

import Nav from "./components/Nav";
import Nearest from "./components/Nearest";
import Upcoming from "./components/Upcoming";
import UtilityBar from "./components/UtilityBar";

export default function App() {
  // const [rideData, setRideData] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [nearest, setNearest] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [user, setUser] = useState({});
  const [utilityBtns, setUtilityBtns] = useState([
    {
      id: "near",
      text: "Nearest",
      left: "",
      isActive: true,
    },
    {
      id: "upcoming",
      text: "Upcoming Rides",
      left: `(${upcoming.length})`,
      isActive: false,
    },
    {
      id: "past",
      text: "Past Rides",
      left: `(${past.length})`,
      isActive: false,
    },
  ]);

  // Rides Fetch
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/rides");

        if (!res.ok) throw new Error("Check your internet connection");
        const data = await res.json();
        // setRideData(data);

        // States
        const statesArray = data.map((obj) => obj.state);
        setStates(statesArray);

        // City
        const cityArray = data.map((obj) => obj.state);
        setCities(cityArray);

        // Nearest
        const codeStr = String(user.station_code);
        let num;
        const range = [];

        for (let count = 0; count <= 9; count++) {
          num = codeStr.slice(0, 1) + String(count);
          range.push(num);
        }

        function filterNearest(rides, a, b) {
          return rides.filter((ride) => {
            //  a <= ride.station_path && ride.station_path <= b
            for (const value of Object.values(ride)) {
              // console.log(value);
              if (value instanceof Array) {
                if (a <= ride.station_path && ride.station_path <= b)
                  return value;
              }
            }
          });
        }

        const nearestRides = filterNearest(data, range[0], range[9]);
        setNearest(nearestRides);

        /*var counts = [4, 9, 15, 6, 2],
    goal = 5;

    const test = nearestRides
      .map((ride) => ride.station_path)
      .reduce(function (prev, curr) {
        return Math.abs(curr - user.station_code) <
          Math.abs(prev - user.station_code)
          ? curr
          : prev;
      });
      console.log(test, user.station_code);
    */

        // Upcoming
        const future = data.filter((obj) => Date.parse(obj.date) > Date.now());
        setUpcoming(future);

        // Past
        const past = data.filter((obj) => Date.parse(obj.date) < Date.now());
        setPast(past);

        setUtilityBtns((pre) =>
          pre.map((obj) => {
            if (obj.id === "upcoming") {
              return {
                ...obj,
                left: `(${upcoming.length})`,
              };
            } else if (obj.id === "past") {
              return {
                ...obj,
                left: `(${past.length})`,
              };
            } else return obj;
          })
        );

        /////////////////
      } catch (error) {
        console.log(error.msg);
      }
    }
    fetchData();
  }, [upcoming.length, user.station_code]);

  // User Info Fetch
  useEffect(() => {
    async function user() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error.msg);
      }
    }
    user();
  }, []);

  function toggleRides(id) {
    setUtilityBtns((pre) => {
      return pre.map((obj) => {
        return obj.id === id
          ? { ...obj, isActive: true }
          : {
              ...obj,
              isActive: false,
            };
      });
    });
  }

  const renderNearest = nearest.map((nearest, index) => (
    <Nearest
      key={index}
      city={nearest.city}
      date={nearest.date}
      destinationStationCode={nearest.destination_station_code}
      mapUrl={nearest.map_url}
      originStationCode={nearest.origin_station_code}
      state={nearest.state}
      stationPath={nearest.station_path.toString()}
      userStationCode={user.station_code}
    />
  ));

  const renderUpcoming = upcoming.map((upcoming, index) => (
    <Upcoming
      key={index}
      city={upcoming.city}
      date={upcoming.date}
      destinationStationCode={upcoming.destination_station_code}
      mapUrl={upcoming.map_url}
      originStationCode={upcoming.origin_station_code}
      state={upcoming.state}
      stationPath={upcoming.station_path.toString()}
      userStationCode={user.station_code}
    />
  ));

  const renderPast = past.map((past, index) => (
    <Upcoming
      key={index}
      city={past.city}
      date={past.date}
      destinationStationCode={past.destination_station_code}
      mapUrl={past.map_url}
      originStationCode={past.origin_station_code}
      state={past.state}
      stationPath={past.station_path.toString()}
      userStationCode={user.station_code}
    />
  ));

  const active = utilityBtns.find((btns) => btns.isActive);
  let render;
  if (active.id === "near") render = renderNearest;
  if (active.id === "upcoming") render = renderUpcoming;
  if (active.id === "past") render = renderPast;

  return (
    <main className='container'>
      <Nav name={user.name} url={user.url} />
      <div className='app-wrap'>
        <UtilityBar
          states={states}
          cities={cities}
          toggleRides={toggleRides}
          utilityBtns={utilityBtns}
        />
        {render}
      </div>
    </main>
  );
}
