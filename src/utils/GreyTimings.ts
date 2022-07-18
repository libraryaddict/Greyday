import { getProperty, min, setProperty, toInt } from "kolmafia";

export class GreyTimings {
  prop: string = "_greyScriptTimings";
  expectingStart: boolean = true;

  doStart() {
    if (!this.expectingStart) {
      throw "Expected a end, not a start";
    }

    this.expectingStart = false;

    let times = getProperty(this.prop)
      .split(",")
      .filter((s) => s.length > 0);

    times.push(this.getTime().toString());
    setProperty(this.prop, times.join(","));
  }

  doEnd() {
    if (this.expectingStart) {
      throw "Expected a start, not a end";
    }

    this.expectingStart = true;
    setProperty(this.prop, getProperty(this.prop) + ":" + this.getTime());
  }

  getTimings(): [number, number][] {
    let timings: [number, number][] = [];

    for (let [t1, t2] of getProperty(this.prop)
      .split(",")
      .map((s) => s.split(":"))) {
      timings.push([toInt(t1), t2 ? toInt(t2) : null]);
    }

    return timings;
  }

  getTotalSeconds(): number {
    let timeTaken: number = 0;
    let timings = this.getTimings();

    for (let i = 0; i < timings.length; i++) {
      let [started, ended] = timings[i];

      if (!ended) {
        ended = i + 1 < timings.length ? timings[i + 1][1] : this.getTime();
      }

      timeTaken += ended - started;
    }

    return timeTaken;
  }

  getTime(): number {
    return Math.round(Date.now() / 1000);
  }

  getTimeAsString(time: number): string {
    let hours = Math.floor(time / 3600).toString();
    let minutes = Math.floor((time % 3600) / 60).toString();
    let seconds = (time % 60).toString();

    if (hours.length <= 1) {
      hours = "0" + hours;
    }

    if (minutes.length <= 1) {
      minutes = "0" + minutes;
    }

    if (seconds.length <= 1) {
      seconds = "0" + seconds;
    }

    return `${hours}:${minutes}:${seconds}`;
  }
}
