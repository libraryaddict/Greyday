import * as React from "react";
import { SettingProp } from "../App";

function DropdownInput(props: SettingProp): JSX.Element {
  return (
    <select className="greydayDropdown" name={props.name}>
      {props.dropdown.map(([display, value]) => {
        return (
          <option
            value={value}
            selected={value.toLowerCase() == props.value.toLowerCase()}
          >
            {display}
          </option>
        );
      })}
    </select>
  );
}

export default DropdownInput;
