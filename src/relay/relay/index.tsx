import * as ReactDOM from "react-dom";
import * as React from "react";
import ".//css/App.scss";
import App, { Data } from "./App";

getData((data: Data) => {
  ReactDOM.render(
    <App notifications={data.notifications} settings={data.settings} />,
    document.getElementById("root")
  );
});
