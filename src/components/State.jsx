import React from "react";

export default function State(props) {
  const { state } = props;
  return <option value={state}>{state}</option>;
}
