import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'budget-management';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    
    // Log the current router state
    this.router.events.subscribe(event => {
      console.log('Router Event:', event);
    });

    // Log the active route
    this.activatedRoute.url.subscribe(url => {
      console.log('Active Route:', url);
    });
  }
}
