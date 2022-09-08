import { getProperty, min, setProperty, toInt } from "kolmafia";

export class GreyTimings {
  prop: string = "_greyScriptTimings";
  expectingStart: boolean = true;

  doStart() {
    if (!this.expectingStart) {
      throw "Expected a end, not a start";
    }

    this.expectingStart = false;

    const times = getProperty(this.prop)
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

    const time = this.getTime();
    const prop = getProperty(this.prop) + ":" + time;
    const secs = this.getTotalSeconds(prop);

    setProperty(this.prop, time - secs + ":" + time);
  }

  getTimings(prop: string): [number, number][] {
    const timings: [number, number][] = [];

    for (const [t1, t2] of prop.split(",").map((s) => s.split(":"))) {
      timings.push([toInt(t1), t2 ? toInt(t2) : null]);
    }

    return timings;
  }

  getTotalSeconds(prop: string = getProperty(this.prop)): number {
    let timeTaken: number = 0;
    const timings = this.getTimings(prop);

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
