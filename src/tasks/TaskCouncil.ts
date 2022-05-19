import { toInt, getProperty, council, myLevel, cliExecute } from "kolmafia";
import { Task } from "./Tasks";

export class TaskCouncil implements Task {
  lastLevelVisited: number = toInt(getProperty("lastCouncilVisit"));

  run() {
    this.lastLevelVisited = Math.min(
      toInt(getProperty("lastCouncilVisit")),
      this.lastLevelVisited
    );

    if (this.lastLevelVisited >= myLevel()) {
      return;
    }

    council();
    this.lastLevelVisited = myLevel();
    cliExecute("refresh inventory");
  }
}
