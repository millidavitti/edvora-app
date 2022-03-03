import React from "react";

export default function City(props) {
  const { city } = props;
  return <option value={city}>{city}</option>;
}
