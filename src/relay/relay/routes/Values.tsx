import * as React from "react";
import Setting from "../components/Setting";
import { SettingProp } from "../types/Types";

function Values({ settings }: { settings: SettingProp[] }): JSX.Element {
  const preferences = settings
    .filter((s) => s.setting == "values")
    .map((setting) => <Setting setting={setting} />);

  return (
    <table>
      <tbody>{preferences}</tbody>
    </table>
  );
}

export default Values;
