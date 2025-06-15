import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  /**
   * Updates the average income for the given user.
   */
  updateAverageIncome(userId: string, averageIncome: number): Observable<any> {
    // This now calls the new backend route: PUT /api/users/:id/income
    return this.http.put(`${this.apiUrl}/${userId}/income`, { averageIncome });
  }

  /**
   * Gets the current user's data by fetching the ID from localStorage.
   */
  getCurrentUser(): Observable<any> {
    // 1. Get the user ID that was saved during login.
    const userId = localStorage.getItem('userId');

    // 2. If there's no ID, we can't fetch a user.
    if (!userId) {
      // Return an empty observable or handle as an error.
      return of(null); 
    }

    // 3. Use the ID to call the correct backend endpoint: GET /api/users/:id
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  // Helper function you'll need in your login component after a successful login.
  // This saves the user's ID so getCurrentUser() can find it.
  saveUserId(id: string): void {
    localStorage.setItem('userId', id);
  }

  // Helper to get the ID, which you can use in your components.
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
