import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AiService } from '../../services/ai.service';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { User } from '../../core/models/user.model';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-ai-suggestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-suggestions.component.html',
  styleUrls: ['./ai-suggestions.component.css']
})
export class AiSuggestionsComponent implements OnInit {
  userPrompt: string = '';
  aiResponse: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  isCustom: boolean = false;
  pastSuggestions: any[] = [];
  expandedIndex: number | null = null;

  private currentUser: User | null = null;

  constructor(
    private aiService: AiService,
    private userService: UserService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user?.id) {
          this.loadPastSuggestions(user.id);
        }
      },
      error: (err) => {
        console.error('Failed to get current user:', err);
        this.error = 'Could not load user data. AI suggestions may not be accurate.';
      }
    });
  }

  loadPastSuggestions(userId: string): void {
    this.aiService.getSuggestionHistory(userId).subscribe({
      next: (suggestions) => {
        this.pastSuggestions = suggestions.sort((a, b) => new Date(b.dateGenerated).getTime() - new Date(a.dateGenerated).getTime());
      },
      error: (err) => {
        console.error('Failed to load past suggestions', err);
      }
    });
  }

  getAutomaticSuggestion(): void {
    this.isCustom = false;
    this.fetchDataAndGeneratePrompt();
  }

  getCustomSuggestion(): void {
    if (!this.userPrompt.trim()) {
      return;
    }
    this.isCustom = true;
    this.fetchDataAndGeneratePrompt();
  }

  private formatTransactionsForPrompt(transactions: Transaction[]): string {
    if (!transactions || transactions.length === 0) {
      return "No transaction data available for this period.";
    }
    return transactions
      .map(t => `- On ${new Date(t.date).toLocaleDateString()}, the user ${t.type === 'expense' ? 'spent' : 'received'} $${t.amount.toFixed(2)}${t.description ? ' for ' + t.description : ''}${t.categoryId ? ' (category: ' + t.categoryId + ')' : ''}.`)
      .join('\n');
  }

  private fetchDataAndGeneratePrompt(): void {
    if (!this.currentUser || !this.currentUser.id) {
      this.error = 'User not identified. Please ensure you are logged in correctly.';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.aiResponse = '';
    this.transactionService.getTransactions().pipe(
      catchError(err => {
        console.error('Failed to fetch transactions:', err);
        this.error = 'Could not fetch transaction data.';
        return of([]);
      })
    ).subscribe(transactions => {
      const user = this.currentUser!;
      const avgIncomeNum = Number(user.averageIncome);
      const avgIncomeStr = isNaN(avgIncomeNum) ? 'Not set' : `$${avgIncomeNum.toFixed(2)}`;
      const userInfo = `User Name: ${user.name || 'N/A'}\nAverage Income: ${avgIncomeStr}`;
      const transactionDetails = this.formatTransactionsForPrompt(transactions);
      const promptContext = `Here is the user's financial data:\n${userInfo}\n\nRecent Transactions:\n${transactionDetails}`;
      let finalPrompt = '';
      if (this.isCustom) {
        finalPrompt = `${promptContext}\n\nBased on the data above, please answer the user's question concisely and in plain text: \"${this.userPrompt}\"`;
      } else {
        // Balanced & Clean Prompt
        finalPrompt = `
        ${promptContext}

        ---
        TASK:
        Based on the user data, provide a clear and concise financial analysis.

        OUTPUT REQUIREMENTS:
        - Format: Use PLAIN TEXT only. Organize your response with simple capitalized titles followed by a new line. Do not use Markdown (like '###' or '*').
        - Conciseness: Keep the entire response brief and to the point. Focus on the top 2-3 most important findings.
        - Tone: Be direct, objective, and provide a final report. Do not ask the user any questions.

        REQUIRED SECTIONS:
        SPENDING OVERVIEW: Briefly describe the user's main spending categories.
        KEY SAVING OPPORTUNITY: Identify the single most impactful change the user can make.
        ACTION PLAN: List 1-2 direct steps the user should take.
        POTENTIAL SAVINGS: State the estimated total yearly savings if the plan is followed.
        `;
      }
      this.callAiService(finalPrompt, user.id);
    });
  }

  private callAiService(prompt: string, userId: string): void {
    this.aiService.generateSuggestion(prompt, userId).subscribe({
      next: (savedSuggestion) => {
        this.aiResponse = savedSuggestion.response;
        this.isLoading = false;
        this.loadPastSuggestions(userId); // Refresh history after new suggestion
      },
      error: (err) => {
        this.error = 'An error occurred while communicating with the AI. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
