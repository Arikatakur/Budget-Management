// src/app/services/category.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:3000/api/categories';

    constructor(private http: HttpClient) { }
        getCategories(userId: string): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}?userId=${userId}`);
    }
    createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
}
}
