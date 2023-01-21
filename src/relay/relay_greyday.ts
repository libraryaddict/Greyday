import { getProperty, write } from "kolmafia";
import { getResourceSettings } from "../typings/ResourceTypes";
import { getGreySettings } from "../utils/GreySettings";
import {
  ComponentDropdown,
  ComponentInterrupt,
  ComponentSetting,
  generateHTML,
  handleApiRequest,
  RelayComponent,
  RelayComponentType,
  RelayPage,
  RelayPreference,
} from "mafia-shared-relay";

function getRelayPages(): RelayPage[] {
  const mainSettings: RelayComponent[] = [
    {
      type: "interrupt",
      name: "Interrupt Greyday",
      notification: "Greyday has been interrupted!",
      actions: [
        { preference: "greyday_interrupt", value: "true" } as RelayPreference,
      ],
    } as ComponentInterrupt,
  ];
  const valuesSettings: RelayComponent[] = [];

  // load user perferences into json object to pass to react
  for (const setting of [...getResourceSettings(), ...getGreySettings()]) {
    if (setting.viable == false) {
      continue;
    }

    let dropdowns: ComponentDropdown[];
    let type: RelayComponentType;

    if (setting.viableSettings != null) {
      if (typeof setting.viableSettings[0] == "string") {
        dropdowns = setting.viableSettings.map((s) => {
          return { value: s };
        });
      } else {
        dropdowns = (setting.viableSettings as [string, string][]).map(
          ([display, value]) => {
            return {
              display: display,
              value: value,
            };
          }
        );
      }

      type = "dropdown";
    } else if (typeof setting.default == "boolean") {
      type = "boolean";
    } else {
      type = "string";
    }

    const prop: ComponentSetting = {
      preference: setting.name,
      name: setting.name,
      description: setting.description,
      default: setting.default == null ? "" : setting.default.toString(),
      value: getProperty(setting.name),
      type: type,
      dropdown: dropdowns,
    };

    if (setting.setting == "main") {
      mainSettings.push(prop);
    } else {
      valuesSettings.push(prop);
    }
  }

  return [
    { page: "Main", components: mainSettings },
    { page: "Values", components: valuesSettings },
  ] as RelayPage[];
}

export function main() {
  if (handleApiRequest()) {
    return;
  }

  write(generateHTML(getRelayPages()));
}
