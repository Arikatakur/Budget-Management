import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-field">
      <label [for]="id">{{ label }}</label>
      <input
        [type]="type"
        [id]="id"
        [name]="name"
        [placeholder]="placeholder"
        [required]="required"
        class="form-input"
        [min]="min"
        [step]="step"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
    </div>
  `,
  styleUrls: ['./form-field.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ]
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'text';
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() min?: number;
  @Input() step?: string | number;

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
  setDisabledState?(isDisabled: boolean): void {}

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
