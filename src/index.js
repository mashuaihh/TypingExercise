import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";

import InputArea from "./components/InputArea";

render(
  <div>
    <DevTools />
    <InputArea />
  </div>,
  document.getElementById("root")
);
