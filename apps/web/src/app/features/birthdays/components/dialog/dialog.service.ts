import {
  ApplicationRef,
  Injectable,
  Injector,
  createComponent,
  Type,
} from '@angular/core';
import { DialogContainerComponent } from './dialog-container.component';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog.tokens';

export interface DialogConfig<TData = unknown> {
  data?: TData;
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open<TResult, TData = unknown>(
    component: Type<unknown>,
    config?: DialogConfig<TData>
  ): DialogRef<TResult> {
    const dialogRef = new DialogRef<TResult>();

    const elementInjector = Injector.create({
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
      parent: this.injector,
    });

    const containerRef = createComponent(
      DialogContainerComponent,
      {
        environmentInjector: this.appRef.injector,
        elementInjector,
      }
    );

    const contentRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector,
    });

    containerRef.location.nativeElement
      .querySelector('.dialog-panel')
      .appendChild(contentRef.location.nativeElement);

    document.body.appendChild(containerRef.location.nativeElement);

    this.appRef.attachView(containerRef.hostView);
    this.appRef.attachView(contentRef.hostView);

    dialogRef.closed$.subscribe(() => {
      this.appRef.detachView(containerRef.hostView);
      this.appRef.detachView(contentRef.hostView);

      containerRef.destroy();
      contentRef.destroy();
    });

    return dialogRef;
  }
}
