import React from "react";
import City from "./City";
import State from "./State";

export default function Filters(props) {
  const {
    states,
    cities,
    filters,
    filterState,
    setFilterState,
    filterCity,
    setFilterCity,
  } = props;
  const renderStates = states.map((state, index) => (
    <State
      key={index}
      state={state}
      filterState={filterState}
      setFilterState={setFilterState}
    />
  ));
  const renderCities = cities.map((city, index) => (
    <City
      key={index}
      city={city}
      filterCity={filterCity}
      setFilterCity={setFilterCity}
    />
  ));

  const showFilter = {
    transform: filters ? "translateY(0)" : "translateY(-50px)",
    opacity: filters ? "1" : "0",
    pointerEvents: filters ? "initial" : "none",
  };

  return (
    <div className='filters' style={showFilter}>
      <h2>Filters</h2>
      <hr />
      <div className='drop-down'>
        {/* State */}
        <select name='state' id='state'>
          <option value=''>State</option>
          {renderStates}
        </select>
        {/* City */}
        <select name='city' id='city'>
          <option value=''>City</option>
          {renderCities}
        </select>
      </div>
    </div>
  );
}
