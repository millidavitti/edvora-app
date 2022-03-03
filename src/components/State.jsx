import React from "react";

export default function State(props) {
  const { state } = props;
  function stateFilter() {
    console.log(state);
  }
  return (
    <option value={state} onClick={stateFilter}>
      {state}
    </option>
  );
}
