import * as ReactDOM from "react-dom";
import * as React from "react";
import ".//css/App.scss";
import { Data } from "./types/Types";
import App from "./App";

getData((data: Data) => {
  ReactDOM.render(
    <>
      <App notifications={data.notifications} settings={data.settings} />
    </>,
    document.getElementById("root")
  );
});
