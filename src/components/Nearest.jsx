import React from "react";
import Rides from "./Rides";

export default function Nearest(props) {
  const {
    city,
    date,
    destinationStationCode,
    mapUrl,
    originStationCode,
    state,
    stationPath,
    userStationCode,
  } = props;
  return (
    <Rides
      city={city}
      date={date}
      destinationStationCode={destinationStationCode}
      mapUrl={mapUrl}
      originStationCode={originStationCode}
      state={state}
      stationPath={stationPath}
      userStationCode={userStationCode}
    />
  );
}
