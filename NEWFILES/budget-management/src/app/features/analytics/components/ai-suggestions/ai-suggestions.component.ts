import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ai-suggestions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ai-suggestions.component.html',
  styleUrl: './ai-suggestions.component.css'
})
export class AiSuggestionsComponent {}
