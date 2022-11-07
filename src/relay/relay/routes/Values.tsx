import * as React from "react";
import { addNotification, saveSettings } from "../api/ApiRequest";
import Setting from "../components/Setting";
import { Data, SettingProp } from "../types/Types";

function Values({ settings }: { settings: SettingProp[] }): JSX.Element {
  const preferences = settings
    .filter((s) => s.setting == "values")
    .map((setting) => <Setting setting={setting} />);

  return (
    <table>
      <p className="unimplemented">This page currently does nothing</p>
      <tbody>{preferences}</tbody>
    </table>
  );
}

export default Values;
