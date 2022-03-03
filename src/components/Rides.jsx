import React from "react";

import Nearest from "./Nearest";

export default function Rides(props) {
  const {
    city,
    date,
    destinationStationCode,
    mapUrl,
    originStationCode,
    state,
    stationPath,
  } = props;

  return (
    <div className='rides grid'>
      <div className='map'>
        <img src={mapUrl} alt='map' />
      </div>
      <div className='ride-info'>
        <p>
          Ride: <span>{destinationStationCode}</span>
        </p>
        <p>
          Origin Station: <span>{originStationCode}</span>
        </p>
        <p>
          station_path: <span>{stationPath}</span>
        </p>
        <p>
          Date: <span>{date}</span>
        </p>
        <p>
          Distance: <span>0</span>
        </p>
      </div>

      <div className='location-info'>
        <p>{city}</p>
        <p>{state}</p>
      </div>
    </div>
  );
}
