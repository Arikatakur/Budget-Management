import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message" class="shared-error">
      {{ message }}
    </div>
  `,
  styleUrls: ['./shared-error.component.css']
})
export class SharedErrorComponent {
  @Input() message = '';
}
