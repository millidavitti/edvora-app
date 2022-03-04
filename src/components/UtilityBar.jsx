import React, { useState } from "react";
import Filters from "./Filters";

// Assets
import filterIcon from "../assets/icons/filters.png";
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
    setRender,
    filterStateNow,
    renderFilteredState,
    renderFilteredCity,
  } = props;
  const [filterBoolean, setFilterBoolean] = useState(false);
  function toggleFilter() {
    setFilterBoolean((pre) => !pre);
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
        <img src={filterIcon} alt='filter' />
      </button>

      {
        <Filters
          states={states}
          cities={cities}
          filterStateNow={filterStateNow}
          filterState={filterState}
          setFilterState={setFilterState}
          filterCity={filterCity}
          setFilterCity={setFilterCity}
          utilityBtns={utilityBtns}
          setRender={setRender}
          filterBoolean={filterBoolean}
          renderFilteredState={renderFilteredState}
          renderFilteredCity={renderFilteredCity}
        />
      }
    </div>
  );
}
