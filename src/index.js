import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import Exercise from "./components/Exercise";

render(
  <React.Fragment>
    <DevTools />
    <Exercise />
  </React.Fragment>,
  document.getElementById("root")
);
