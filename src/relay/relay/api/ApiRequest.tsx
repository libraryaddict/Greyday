import { SettingProp } from "../types/Types";

async function getProperty(property: string): Promise<string> {
  return runJavascript(`require(\`kolmafia\`).getProperty(\`${property}\`);`);
}

export function addNotification(notification: string) {
  const ele = document.createElement("div");
  ele.className = "notification";
  ele.addEventListener("animationend", () => ele.remove());
  ele.innerText = notification;

  const container = document.getElementById("notificationsContainer");

  if (!container) {
    return;
  }

  container.appendChild(ele);
}

export async function setProperty(
  property: string,
  value: string
): Promise<void> {
  await runJavascript(
    `require("kolmafia").setProperty(\`${property}\`, \`${value}\`);`
  );
}

export function saveSettings(properties: SettingProp[]): Promise<string> {
  return setProperties(
    properties.map((prop) => [prop.name, prop.value.trim()])
  );
}

function setProperties(properties: [string, string][]): Promise<string> {
  let js =
    'const changed = []; const change = (key, value) => { let prev = require("kolmafia").getProperty(key); if (prev === value)return; changed.push([key, prev, value]); require("kolmafia").setProperty(key, value);};';

  js += properties
    .map(([k, v]) => {
      return `change(\`${k}\`, \`${v}\`);`;
    })
    .join("\n");

  js += "JSON.stringify(changed);";

  return runJavascript(js);
}

async function runJavascript(javascript: string): Promise<string> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.open("POST", window.location.href, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("api=" + encodeURIComponent(javascript));
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4 || xhr.status != 200) {
        return;
      }

      resolve(xhr.responseText);
    };
  });
}
