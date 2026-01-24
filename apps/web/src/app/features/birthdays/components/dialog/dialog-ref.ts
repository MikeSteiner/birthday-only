import { Subject, Observable } from 'rxjs';

export class DialogRef<T = unknown> {
  private readonly closedSubject = new Subject<T | undefined>();
  private closed = false;

  readonly closed$: Observable<T | undefined> =
    this.closedSubject.asObservable();

  close(result?: T): void {
    if (this.closed) return;

    this.closed = true;
    this.closedSubject.next(result);
    this.closedSubject.complete();
  }
}
