import { _ } from "core-js";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { addNotification, saveSettings, setProperty } from "../api/ApiRequest";
import { SettingProp } from "../types/Types";

const Layout = ({ settings }: { settings: SettingProp[] }) => {
  return (
    <>
      {" "}
      <nav>
        <div className="topBar">
          {" "}
          <div className="tabEntry">
            <NavLink to="/">Main Settings</NavLink>{" "}
          </div>
          <div className="tabEntry">
            <NavLink to="/values">Resource Values</NavLink>{" "}
          </div>
          <input
            className="interrupt"
            type="submit"
            value="Interrupt Greyday"
            onClick={() =>
              setProperty("greyday_interrupt", "true").then(() =>
                addNotification("Greyday has been asked to stop.")
              )
            }
          />
        </div>
      </nav>{" "}
      <div id="notificationsContainer"></div>
      <div id="greydayContainer">
        <Outlet />
      </div>{" "}
      <input
        className="save"
        onClick={() =>
          saveSettings(settings).then((e) => {
            const changed: [string, string, string][] = JSON.parse(e);

            for (const [prop, prev, now] of changed) {
              addNotification(`${prop} changed from \`${prev}\` to \`${now}\``);
            }

            if (changed.length == 0) {
              addNotification("No settings were modified.");
            }
          })
        }
        type="submit"
        value="Save Changes"
      />
    </>
  );
};

export default Layout;
