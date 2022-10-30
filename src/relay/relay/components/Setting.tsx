import * as React from "react";
import { SettingProp } from "../App";
import BooleanInput from "./BooleanInput";
import DropdownInput from "./DropdownInput";

function Setting(props: SettingProp): JSX.Element {
  return (
    <tr id="userPreference">
      <td>{props.name}</td>
      <td>
        {props.type === "boolean" ? (
          <BooleanInput {...props} />
        ) : props.dropdown != null ? (
          <DropdownInput {...props} />
        ) : (
          <input
            className="stringPreference"
            name={props.name}
            defaultValue={props.value}
          />
        )}
      </td>
      <td>{props.description}</td>
    </tr>
  );
}

export default Setting;
