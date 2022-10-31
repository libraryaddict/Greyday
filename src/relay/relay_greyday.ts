import {
  formFields,
  getProperty,
  propertyExists,
  setProperty,
  writeln,
} from "kolmafia";
import { getGreySettings } from "../utils/GreySettings";

type SettingProp = {
  name: string;
  description: string;
  default: string;
  value: string;
  type: string;
  dropdown?: [string, string][];
  viable?: boolean; // If this is viable to the user in question
};

export function main(): void {
  const notifications: string[] = [];
  // handle updating values
  const fields = formFields();

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
  for (const setting of getGreySettings()) {
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
      name: setting.name,
      description: setting.description,
      default: setting.default == null ? "" : setting.default.toString(),
      value: getProperty(setting.name),
      dropdown: dropdowns,
      viable: setting.viable != false,
      type: typeof setting.default,
    };

    if (!propertyExists(prop.name) || !setting.valid(prop.value)) {
      prop.value = setting.default + "";
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
