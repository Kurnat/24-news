import { Article } from './../interfaces/article.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsSecondService {

  url = 'http://localhost:3000/news-second';
  constructor(private http: HttpClient) { }

  getData(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}`);
  }

  getById(id): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`);
  }

  setData(data): Observable<Article> {
    return this.http.post<Article>(`${this.url}`, data);
  }

  deleteData(id): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/${id}`);
  }

  updateData(data): Observable<Article> {
    console.log(data);
    return this.http.put<Article>(`${this.url}/${data.id}`, data);
  }

  getDataByCategoty(category) {
    return this.http.get<any>(`${this.url}?category=${category}`);


  }
}
