export class RepeatAction {
  private initialTimer: any;
  private initialDelayMs: number;
  private intervalTimer: any;
  private intervalMs: number;
  private action: () => any;

  constructor(action: () => any, timeoutMs: number = 500, intervalMs: number = 50) {
    this.action = action;
    this.initialDelayMs = timeoutMs;
    this.intervalMs = intervalMs;
  }

  public start() {
    this.stop();
    this.initialTimer = setTimeout(() =>
      this.intervalTimer = setInterval(() => this.action(), this.intervalMs),
      this.initialDelayMs
    );
  }

  public stop() {
    clearTimeout(this.initialTimer);
    clearInterval(this.intervalTimer);
  }
}
