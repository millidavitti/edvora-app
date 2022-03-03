import React, { useState } from "react";
import Filters from "./Filters";

// Assets
import filter from "../assets/icons/filters.png";
export default function UtilityBar(props) {
  const { states, cities } = props;
  const [filters, setFilters] = useState(false);
  function toggleFilter() {
    setFilters((pre) => !pre);
  }
  return (
    <div className='utility'>
      <div className='sort-rides'>
        <button className='sort-btn'>Nearest rides</button>
        <button className='sort-btn'>
          Upcoming rides <span>(2)</span>
        </button>
        <button className='sort-btn'>
          Past rides <span>(4)</span>
        </button>
      </div>

      <button onClick={toggleFilter}>
        <img src={filter} alt='filter' />
      </button>
      {filters && <Filters states={states} cities={cities} />}
    </div>
  );
}
