import { IArticle } from './../interfaces/article.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsSecondService {

  url = 'http://localhost:3000/news?typeNews=additional';
  constructor(private http: HttpClient) { }

  getData(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(`${this.url}`);
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
