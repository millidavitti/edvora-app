import React from "react";
import City from "./City";
import State from "./State";

export default function Filters(props) {
  const {
    states,
    cities,
    setFilterState,
    setFilterCity,
    filterBoolean,
    setRender,
    renderFilteredState,
    renderFilteredCity,
  } = props;
  const renderStates = states.map((state, index) => (
    <State
      key={index}
      state={state}
      setFilterState={setFilterState}
      renderFilteredState={renderFilteredState}
      renderFilteredCity={renderFilteredCity}
      setRender={setRender}
    />
  ));
  const renderCities = cities.map((city, index) => (
    <City key={index} city={city} setFilterCity={setFilterCity} setRender />
  ));

  const showFilter = {
    transform: filterBoolean ? "translateY(0)" : "translateY(-50px)",
    opacity: filterBoolean ? "1" : "0",
    pointerEvents: filterBoolean ? "initial" : "none",
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
