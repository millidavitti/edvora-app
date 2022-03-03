import React, { useState } from "react";
import Filters from "./Filters";

// Assets
import filter from "../assets/icons/filters.png";
import UtilityBtn from "./UtilityBtn";
export default function UtilityBar(props) {
  const { states, cities, utilityBtns, toggleRides } = props;
  const [filters, setFilters] = useState(false);
  function toggleFilter() {
    setFilters((pre) => !pre);
  }

  return (
    <div className='utility'>
      {utilityBtns.map((btn) => (
        <UtilityBtn
          key={btn.id}
          id={btn.id}
          text={btn.text}
          left={btn.left}
          isActive={btn.isActive}
          toggleRides={toggleRides}
        />
      ))}
      <button onClick={toggleFilter}>
        <img src={filter} alt='filter' />
      </button>
      {filters && <Filters states={states} cities={cities} />}
    </div>
  );
}
