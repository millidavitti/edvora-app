import React, { useState } from "react";
import Filters from "./Filters";

// Assets
import filter from "../assets/icons/filters.png";
import UtilityBtn from "./UtilityBtn";
export default function UtilityBar(props) {
  const {
    states,
    cities,
    utilityBtns,
    toggleRides,
    filterState,
    setFilterState,
    filterCity,
    setFilterCity,
    setFilterCheck,
  } = props;
  const [filters, setFilters] = useState(false);
  function toggleFilter() {
    setFilters((pre) => !pre);
  }

  // if (filterState)
  //   setFilterCheck((pre) => {
  //     return {
  //       ...pre,
  //       state: true,
  //     };
  //   });
  // if (filterCity)
  //   setFilterCheck((pre) => {
  //     return {
  //       ...pre,
  //       city: true,
  //     };
  //   });

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

      {
        <Filters
          states={states}
          cities={cities}
          filters={filters}
          filterState={filterState}
          setFilterState={setFilterState}
          filterCity={filterCity}
          setFilterCity={setFilterCity}
        />
      }
    </div>
  );
}
