/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";

import Nav from "./components/Nav";
import Nearest from "./components/Nearest";
import Upcoming from "./components/Upcoming";
import Past from "./components/Past";
import UtilityBar from "./components/UtilityBar";

export default function App() {
  // SECTION useState
  const [rideData, setRideData] = useState([]);
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
  const [render, setRender] = useState([]);
  // const [filteredState, setFilteredState] = useState("");
  // const [filteredCity, setFilteredCity] = useState("");

  // SECTION Filters
  const [filterState, setFilterState] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterBoth, setFilterBoth] = useState([]);

  //SECTION User Info Fetch
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

  //SECTION Rides Fetch
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/rides");

        if (!res.ok) throw new Error("Check your internet connection");
        const data = await res.json();
        setRideData(data);

        //SECTION States
        const statesArray = data.map((obj) => obj.state);
        setStates(statesArray);

        // City
        const cityArray = data.map((obj) => obj.state);
        setCities(cityArray);

        //SECTION Nearest
        const codeStr = String(user.station_code);
        let num;
        const range = [];

        for (let count = 0; count <= 9; count++) {
          num = codeStr.slice(0, 1) + String(count);
          range.push(num);
        }

        function filterNearest(rides, start, end) {
          return rides.filter((ride) => {
            for (const value of Object.values(ride)) {
              if (value instanceof Array) {
                if (start <= ride.station_path && ride.station_path <= end)
                  return value;
              }
            }
          });
        }

        const nearestRides = filterNearest(data, range[0], range[9]);
        setNearest(nearestRides);
        // console.log(nearest, user.station_code);

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

        //SECTION Upcoming
        const future = data.filter((obj) => Date.parse(obj.date) > Date.now());
        setUpcoming(future);

        //SECTION Past
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.station_code]);

  const active = utilityBtns.find((btn) => btn.isActive);

  // SECTION Renders
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
    <Past
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

  function toggleRides(id) {
    console.log(id);
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
    if ("near" === id) setRender(renderNearest);
    if ("upcoming" === id) setRender(renderUpcoming);
    if ("past" === id) setRender(renderPast);
  }

  // SECTION Filters

  const filters = {
    filterState(obj) {
      return obj.filter((ride) => ride.state === filterState);
    },
    filterCity(obj) {
      return obj.filter((ride) => ride.city === filterCity);
    },
    filterBoth(obj) {
      return obj.filter(
        (ride) => ride.city === filterCity && ride.state === filterState
      );
    },
  };
  let renderFilteredState, renderFilteredCity;
  let filPastCity, filNearCity, filUpCity, filPastBoth, filNearBoth, filUpBoth;

  // SECTION State Filtering
  if (active.id === "past") {
    renderFilteredState = filters
      .filterState(past)
      .map((past, index) => (
        <Past
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
    console.log(renderFilteredState);
  }
  if (active.id === "near") {
    renderFilteredState = filters
      .filterState(nearest)
      .map((near, index) => (
        <Nearest
          key={index}
          city={near.city}
          date={near.date}
          destinationStationCode={near.destination_station_code}
          mapUrl={near.map_url}
          originStationCode={near.origin_station_code}
          state={near.state}
          stationPath={near.station_path.toString()}
          userStationCode={user.station_code}
        />
      ));
  }
  if (active.id === "upcoming") {
    renderFilteredState = filters
      .filterState(upcoming)
      .map((upcoming, index) => (
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
  }

  //SECTION City Filtering
  if (active.id === "past") {
    renderFilteredCity = filters
      .filterCity(past)
      .map((past, index) => (
        <Past
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
  }
  if (active.id === "near") {
    renderFilteredCity = filters
      .filterCity(nearest)
      .map((near, index) => (
        <Nearest
          key={index}
          city={near.city}
          date={near.date}
          destinationStationCode={near.destination_station_code}
          mapUrl={near.map_url}
          originStationCode={near.origin_station_code}
          state={near.state}
          stationPath={near.station_path.toString()}
          userStationCode={user.station_code}
        />
      ));
  }
  if (active.id === "upcoming") {
    renderFilteredCity = filters
      .filterCity(upcoming)
      .map((upcoming, index) => (
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
  }

  // SECTION Filtering Both

  if (active.id === "past" && filterState !== "" && filterCity !== "") {
    filPastBoth = filters.filterBoth(past);
    console.log(filPastBoth);
  }
  if (active.id === "near" && filterState !== "" && filterCity !== "") {
    filNearBoth = filters.filterBoth(nearest);
    console.log(filNearBoth);
  }
  if (active.id === "upcoming" && filterState !== "" && filterCity !== "") {
    filUpBoth = filters.filterBoth(upcoming);
    console.log(filUpBoth);
  }

  console.log(filterState, filterCity);
  // console.log(filterStateNow(past));

  return (
    <main className='container'>
      <Nav name={user.name} url={user.url} />
      <div className='app-wrap'>
        <UtilityBar
          states={states}
          cities={cities}
          toggleRides={toggleRides}
          utilityBtns={utilityBtns}
          setFilterState={setFilterState}
          setFilterCity={setFilterCity}
          setRender={setRender}
          past={past}
          // SECTION Filtered
          renderFilteredState={renderFilteredState}
          renderFilteredCity={renderFilteredCity}
        />
        {render}
      </div>
    </main>
  );
}
