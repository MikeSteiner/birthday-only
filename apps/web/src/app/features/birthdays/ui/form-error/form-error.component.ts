import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'bd-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  imports: [],
})
export class FormErrorComponent {
  control = input<AbstractControl | null>();
  messages = input<Record<string, string> | null>();

  message() {
    const errors = this.control()?.errors;
    if (!errors) {
      return '';
    }

    const firstKey = Object.keys(errors)[0];

    return this.messages()?.[firstKey] ?? 'Invalid value';
  }
}
