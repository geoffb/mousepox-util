/** Generic receiver callback */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SignalReceiver = (...args: any[]) => void;

/** Signal emitter */
export class Signal<R extends SignalReceiver = SignalReceiver> {

  /** Receivers */
  private readonly receivers: R[] = [];

  /** Attaches a receiver to this signal */
  public receive(receiver: R): void {
    this.receivers.push(receiver);
  }

  /** Detaches a reciever from this signal */
  public ignore(receiver: R): void {
    const index = this.receivers.indexOf(receiver);
    if (index !== -1) {
      this.receivers.splice(index, 1);
    }
  }

  /** Detaches ALL receivers from this signal */
  public purge(): void {
    this.receivers.length = 0;
  }

  /** Emits this signal by notifying all receivers */
  public emit(...args: Parameters<R>): void {
    for (const receiver of this.receivers) {
      receiver(...args);
    }
  }

}
