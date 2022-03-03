import React from "react";

export default function City(props) {
  const { city, setFilterCity } = props;
  function cityFilter() {
    setFilterCity(city);
  }
  return (
    <option value={city} onClick={cityFilter}>
      {city}
    </option>
  );
}
