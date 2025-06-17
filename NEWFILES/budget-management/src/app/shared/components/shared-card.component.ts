import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-card',
  standalone: true,
  template: `
    <div [class]="cardClass">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./shared-card.component.css']
})
export class SharedCardComponent {
  @Input() cardClass = '';
}
