export class TimedAction {
  private timeoutTimer: any;
  private timeoutMs: number;
  private intervalTimer: any;
  private intervalMs: number;
  private action: () => any;

  constructor(action: () => any, timeoutMs: number = 500, intervalMs: number = 50) {
    this.action = action;
    this.timeoutMs = timeoutMs;
    this.intervalMs = intervalMs;
  }

  public set() {
    this.clear();
    this.timeoutTimer = setTimeout(() =>
      this.intervalTimer = setInterval(() => this.action(), this.intervalMs),
      this.timeoutMs
    );
  }

  public clear() {
    clearTimeout(this.timeoutTimer);
    clearInterval(this.intervalTimer);
  } 
};
