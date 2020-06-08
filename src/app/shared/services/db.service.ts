import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  url = 'http://localhost:3000/news';
  urlGeneral = 'http://localhost:3000/news?typeNews=general';
  urlAdditional = 'http://localhost:3000/news?typeNews=additional';
  constructor(private http: HttpClient) { }

  getData(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}`);
  }

  getGeneralData(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.urlGeneral}`);
  }

  getAdditionalData(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.urlAdditional}`);
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
