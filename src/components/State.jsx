import React from "react";

export default function State(props) {
  const { state, setFilterState } = props;

  function stateFilter() {
    setFilterState(state);
  }

  return (
    <option value={state} onClick={stateFilter}>
      {state}
    </option>
  );
}
