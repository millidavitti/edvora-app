import React from "react";
import City from "./City";
import State from "./State";

export default function Filters(props) {
  const { states, cities } = props;
  const renderStates = states.map((state) => <State state={state} />);
  const renderCities = cities.map((city) => <City city={city} />);

  return (
    <div className='filters'>
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
