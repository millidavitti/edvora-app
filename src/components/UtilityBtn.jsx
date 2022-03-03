import React from "react";

function UtilityBtn(props) {
  const { id, text, left, isActive, toggleRides } = props;
  const underLine = {
    borderBottom: isActive ? "2px solid white" : "none",
  };
  return (
    <div className='sort-rides' onClick={toggleRides.bind(null, id)}>
      <button className='sort-btn' id={id} style={underLine}>
        {text} <span>{left}</span>
      </button>
    </div>
  );
}

export default UtilityBtn;
