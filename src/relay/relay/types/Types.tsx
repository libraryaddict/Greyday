export type SettingType = "main" | "values";

export type SettingProp = {
  setting?: SettingType;
  name: string;
  description: string;
  default: string;
  savedValue: string;
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
