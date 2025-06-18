import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field">
      <label *ngIf="label" [for]="id">{{ label }}</label>
      <input
        class="form-input"
        [type]="type"
        [id]="id"
        [name]="name"
        [placeholder]="placeholder"
        [required]="required"
        [(ngModel)]="value"
        (blur)="onTouched()"
        (input)="handleInput($event)"
      />
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
    .form-input {
      padding: 7px 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
  `],
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  standalone: true
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label: string | undefined;
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  value: any = '';
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
  }
}
