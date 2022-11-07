import * as React from "react";
import { addNotification, saveSettings, setProperty } from "../api/ApiRequest";
import Setting from "../components/Setting";
import { SettingProp } from "../types/Types";

function Main({ settings }: { settings: SettingProp[] }): JSX.Element {
  const preferences = settings
    .filter((s) => s.setting != "values")
    .map((setting) => <Setting setting={setting} />);

  return (
    <table>
      <tbody>{preferences}</tbody>
    </table>
  );
}

export default Main;
