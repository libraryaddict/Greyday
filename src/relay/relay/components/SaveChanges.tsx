import { SettingProp } from "../types/Types";

function SaveChanges({ settings }: { settings: SettingProp[] }) {
  const obj = {};

  settings.forEach((s) => {
    obj[s.name] = "" + s.value;
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", window.location.href, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(obj));
}

export default SaveChanges;
