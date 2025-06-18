import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field">
      <label *ngIf="label">{{ label }}</label>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .form-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  `]
})
export class FormFieldComponent {
  @Input() label: string | undefined;
}
