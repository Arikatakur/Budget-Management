import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [class]="'shared-btn ' + buttonClass"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./shared-button.component.css']
})
export class SharedButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() buttonClass = '';
  @Input() disabled = false;
  @Input() onClick: (event: Event) => void = () => {};
}
