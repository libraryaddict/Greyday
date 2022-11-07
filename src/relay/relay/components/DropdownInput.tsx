import * as React from "react";
import { SettingProp } from "../types/Types";

function DropdownInput({ setting }: { setting: SettingProp }): JSX.Element {
  return (
    <select
      className="dropdowncontainer"
      name={setting.name}
      defaultValue={setting.value}
      onChange={(e) => (setting.value = e.target.value)}
    >
      {setting.dropdown.map(([display, value]) => {
        return (
          <option key={value} value={value}>
            {display}
          </option>
        );
      })}
    </select>
  );
}

export default DropdownInput;
