import { visitUrl, urlEncode, print } from "kolmafia";

export interface Kmail {
  id: string;
  type: string;
  azunixtime: string;
  localtime: string;
  fromid: string;
  fromname: string;
  message: string;

  delete(): boolean;
}

export function getKmails(caller: string = "GreyDay"): Kmail[] {
  const buffer = visitUrl(
    "api.php?pwd&what=kmail&count=100&for=" + urlEncode(caller)
  );

  const kmails: Kmail[] = JSON.parse(buffer);

  kmails.forEach((mail) => {
    mail.delete = () => {
      const del =
        "messages.php?the_action=delete&box=Inbox&pwd&sel" + mail.id + "=on";

      return visitUrl(del).includes("1 message deleted.");
    };
  });

  return kmails;
}

export function isJunkKmail(kmail: Kmail) {
  return (
    kmail.fromname == "Lady Spookyraven's Ghost" ||
    (kmail.fromname == "The Loathing Postal Service" &&
      kmail.message.includes("telegram from Lady Spookyraven"))
  );
}

export function deleteJunkKmails() {
  getKmails().forEach((mail) => {
    if (!isJunkKmail(mail)) {
      return;
    }

    print("Deleting junk kmail from " + mail.fromname, "gray");

    const state = mail.delete();

    if (state) {
      return;
    }

    print("Failed to delete kmail.", "red");
  });
}
