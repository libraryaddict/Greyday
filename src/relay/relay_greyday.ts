import {
  formFields,
  getProperty,
  propertyExists,
  setProperty,
  write,
  writeln,
} from "kolmafia";
import { getResourceSettings } from "../typings/ResourceTypes";
import { getGreySettings, GreySettingType } from "../utils/GreySettings";

export type SettingProp = {
  setting?: GreySettingType;
  name: string;
  description: string;
  default: string;
  savedValue: string;
  value: string;
  type: string;
  dropdown: [string, string][];
  viable?: boolean; // If this is viable to the user in question
};

export function main(): void {
  const notifications: string[] = [];
  // handle updating values
  const fields = formFields();

  if (fields["api"] != null) {
    const returns = eval(fields["api"]) || "";

    write(returns + (returns ? "" : " "));
    return;
  }

  Object.keys(fields).forEach((field) => {
    if (field === "relay") {
      return;
    }

    if (field === "notifications") {
      notifications.push(...JSON.parse(fields[field]));
      return;
    }

    if (getProperty(field).toString() !== fields[field]) {
      notifications.push(
        `${field} changed from ${getProperty(field)} to ${fields[field]}`
      );

      setProperty(field, fields[field]);
    }
  });

  const settings: SettingProp[] = [];

  // load user perferences into json object to pass to react
  for (const setting of [...getResourceSettings(), ...getGreySettings()]) {
    let dropdowns: [string, string][];

    if (setting.viableSettings != null) {
      if (typeof setting.viableSettings[0] == "string") {
        dropdowns = setting.viableSettings = setting.viableSettings.map((s) => [
          s,
          s,
        ]) as [string, string][];
      } else {
        dropdowns = setting.viableSettings as [string, string][];
      }
    }

    const prop: SettingProp = {
      setting: setting.setting,
      name: setting.name,
      description: setting.description,
      default: setting.default == null ? "" : setting.default.toString(),
      value: getProperty(setting.name),
      savedValue: getProperty(setting.name),
      dropdown: dropdowns,
      viable: setting.viable != false,
      type: typeof setting.default,
    };

    if (!propertyExists(prop.name) || !setting.valid(prop.value)) {
      prop.value = setting.default + "";

      if (!propertyExists(prop.name)) {
        prop.savedValue = prop.value;
      }
    }

    if (dropdowns != null) {
      const dropSetting = dropdowns.find(
        ([s]) => s.toLowerCase().trim() == prop.value.toLowerCase().trim()
      );

      if (dropSetting != null && dropSetting[0] != prop.value) {
        prop.value = dropSetting[0];
      }
    }

    settings.push(prop);
  }

  writeln('<head><link rel="stylesheet" href="/greyday/main.css"></head>');
  writeln('<div id="root"></div>');

  writeln("<script>");

  // add script that react calls when loaded to get kol data
  writeln(
    `let getData = function(callback) {callback(${JSON.stringify({
      settings: settings,
      notifications: notifications,
    })})}`
  );

  // close notifications when they are clicked on
  writeln(`document.onclick = (e) => {
    if(e.target.classList.contains('notification')) e.target.remove();
  }`);

  writeln("</script>");

  // include react scripts
  writeln('<script src="./greyday/greyday_relay.js"></script>');
}
