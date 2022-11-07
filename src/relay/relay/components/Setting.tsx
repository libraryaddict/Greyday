import * as React from "react";
import { SettingProp } from "../types/Types";
import BooleanInput from "./BooleanInput";
import DropdownInput from "./DropdownInput";

function Setting({ setting }: { setting: SettingProp }): JSX.Element {
  return (
    <tr id="userPreference">
      <td>{setting.name}</td>
      <td>
        {setting.type === "boolean" ? (
          <BooleanInput setting={setting} />
        ) : setting.dropdown != null ? (
          <DropdownInput setting={setting} />
        ) : (
          <input
            className="stringcontainer"
            name={setting.name}
            defaultValue={setting.value}
            onChange={(e) => (setting.value = e.target.value)}
          />
        )}
      </td>
      <td>{setting.description}</td>
    </tr>
  );
}

export default Setting;
