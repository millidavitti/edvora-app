import React from "react";

export default function State(props) {
  const {
    state,
    setFilterState,
    renderFilteredState,
    renderFilteredCity,
    setRender,
  } = props;

  function stateFilter(id) {
    setFilterState(state);
    setRender(renderFilteredState || renderFilteredCity);
  }

  // const [filteredState, setFilteredState] = useState([]);
  // const [filteredCity, setFilteredCity] = useState([]);

  // const [filterCheck, setFilterCheck] = useState({ state: false, city: false });

  // const filteredState = render.filter((ride) => ride.state === filterState);

  // render.filter((ride) => ride.city === filterCity);

  // // Filter Check
  // console.log(filterCheck, filteredState, render);

  return (
    <option value={state} onClick={stateFilter}>
      {state}
    </option>
  );
}
