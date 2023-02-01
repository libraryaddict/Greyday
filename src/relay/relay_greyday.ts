import { write } from "kolmafia";
import { getResourceSettings } from "../typings/ResourceTypes";
import { getGreySettings } from "../utils/GreySettings";
import {
  DropdownValue,
  generateHTML,
  handleApiRequest,
  PreferenceValue,
  RelayComponent,
  RelayComponentType,
  RelayDropdown,
  RelayInterrupt,
  RelayPage,
  RelaySetting,
  RelayTags,
} from "mafia-shared-relay";

function getRelayPages(): RelayPage[] {
  const mainSettings: RelayComponent[] = [
    {
      type: "interrupt",
      name: "Interrupt Greyday",
      notification: "Greyday has been interrupted!",
      actions: [
        { preference: "greyday_interrupt", value: "true" } as PreferenceValue,
      ],
    } as RelayInterrupt,
  ];
  const valuesSettings: RelayComponent[] = [];

  // load user perferences into json object to pass to react
  for (const setting of [...getResourceSettings(), ...getGreySettings()]) {
    if (setting.viable == false) {
      continue;
    }

    let dropdowns: DropdownValue[];
    let type: RelayComponentType;

    if (setting.viableSettings != null) {
      if (typeof setting.viableSettings[0] == "string") {
        dropdowns = setting.viableSettings.map((s) => {
          return { display: s, value: s };
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

      if (setting.tags != null) {
        type = "tags";
      } else {
        type = "dropdown";
      }
    } else if (typeof setting.default == "boolean") {
      type = "boolean";
    } else {
      type = "string";
    }

    const prop: RelaySetting = {
      type: type,
      name: setting.name,
      placeholderText: null,
      preference: setting.property,
      description: setting.description,
      default: setting.default == null ? "" : setting.default.toString(),
      validate:
        typeof setting.default == "number" ? "(s) => /^-?\\d+$/.test(s)" : null,
      invalidReason: "This is not a proper number!",
    };

    if (dropdowns != null) {
      (prop as RelayDropdown).dropdown = dropdowns;
    }

    if (setting.tags != null) {
      (prop as RelayTags).maxTags = setting.tags.maxTags;
    }

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
