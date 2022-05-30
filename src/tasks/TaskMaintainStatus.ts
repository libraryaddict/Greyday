import { cliExecute, myHp, myMaxhp, myMaxmp, myMeat, myMp } from "kolmafia";
import { Task } from "./Tasks";

export class TaskMaintainStatus implements Task {
  run(): void {
    while (myMeat() > 100 && myMp() < (myMaxmp() < 40 ? 20 : 40)) {
      cliExecute("acquire 1 Doc Galaktik's Invigorating Tonic");
      cliExecute("use Doc Galaktik's Invigorating Tonic");
    }

    while (myMeat() > 100 && myHp() < Math.min(myMaxhp() / 2, 50)) {
      cliExecute("acquire 1 Doc Galaktik's Homeopathic Elixir");
      cliExecute("use Doc Galaktik's Homeopathic Elixir");
    }
  }
}
