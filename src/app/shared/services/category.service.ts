import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'http://localhost:3000/category';
  constructor(private http: HttpClient) { }

  getAllCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}`);
  }

  getById(id): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  setData(data): Observable<Category> {
    return this.http.post<Category>(this.url, data);
  }

  deleteData(id): Observable<Category> {
    return this.http.delete<Category>(`${this.url}/${id}`);
  }

  updateData(data): Observable<Category> {
    console.log(data);
    return this.http.put<Category>(`${this.url}/${data.id}`, data);
  }

}
