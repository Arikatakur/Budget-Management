import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],  // <-- Add RouterOutlet here
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}
