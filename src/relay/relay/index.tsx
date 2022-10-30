import * as ReactDOM from "react-dom";
import * as React from "react";
import App, { Data } from "./App";
import ".//css/App.scss";

getData((data: Data) => {
  ReactDOM.render(
    <App notifications={data.notifications} settings={data.settings} />,
    document.getElementById("root")
  );
});
