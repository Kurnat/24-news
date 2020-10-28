import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticle } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  url = 'http://localhost:3000/news';
  urlGeneral = 'http://localhost:3000/news?typeNews=general';
  urlAdditional = 'http://localhost:3000/news?typeNews=additional';
  constructor(private http: HttpClient) { }

  getData(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this.url}`);
  }

  getGeneralData(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this.urlGeneral}`);
  }

  getAdditionalData(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this.urlAdditional}`);
  }

  getById(id): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.url}/${id}`);
  }

  setData(data): Observable<IArticle> {
    return this.http.post<IArticle>(`${this.url}`, data);
  }

  deleteData(id): Observable<IArticle> {
    return this.http.delete<IArticle>(`${this.url}/${id}`);
  }

  updateData(data): Observable<IArticle> {
    console.log(data);
    return this.http.put<IArticle>(`${this.url}/${data.id}`, data);
  }

  getDataByCategoty(category) {
    return this.http.get<any>(`${this.url}?category=${category}`);
  }
}
