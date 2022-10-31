import * as React from "react";
import Setting from "./components/Setting";

export type SettingProp = {
  name: string;
  description: string;
  default: string;
  value: string;
  type: string;
  dropdown: [string, string][];
  viable?: boolean; // If this is viable to the user in question
};

export type Data = {
  settings: SettingProp[];
  notifications: string[];
};

declare global {
  function getData(callback: (data: Data) => void): void;
}

function App({ settings, notifications }: Data): JSX.Element {
  const preferences = settings.map((setting) => (
    <Setting
      value={setting.value}
      type={setting.type}
      name={setting.name}
      description={setting.description}
      default={setting.default}
      dropdown={setting.dropdown}
    />
  ));

  const onInterruptClicked = (): void => {
    const interruptInput = document.getElementById(
      "greydayInterrupt"
    ) as HTMLInputElement;
    interruptInput.value = "true";
    const form = document.getElementById("greydayForm") as HTMLFormElement;
    form.submit();
  };

  const updatedPreferences = notifications.map((notification) => (
    <div className="notification">{notification}</div>
  ));

  return (
    <div id="greydayContainer">
      <div id="notificationsContainer">{updatedPreferences}</div>
      <form id="greydayForm" action="" method="post">
        <input
          className="interrupt"
          type="submit"
          value="Interrupt Greyday"
          onClick={onInterruptClicked}
        />
        <input
          id="greydayInterrupt"
          type="hidden"
          name="greyday_interrupt"
          value="false"
        />
        <table>{preferences}</table>
        <input className="save" type="submit" value="Save Changes" />
      </form>
    </div>
  );
}

export default App;
