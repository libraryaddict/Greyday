import { Routes, Route, MemoryRouter } from "react-router-dom";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import Main from "./routes/Main";
import Values from "./routes/Values";
import { Data } from "./types/Types";
import Layout from "./components/Layout";

function App({ settings }: Data) {
  return (
    <MemoryRouter>
      {" "}
      <Routes>
        {" "}
        <Route element={<Layout settings={settings} />}>
          {" "}
          <Route index element={<Main settings={settings} />} />{" "}
          <Route path="/:values" element={<Values settings={settings} />} />{" "}
        </Route>{" "}
      </Routes>{" "}
    </MemoryRouter>
  );
}

export default App;
