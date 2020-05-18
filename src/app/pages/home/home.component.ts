import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Response {
  Search: [];
  totalResults: string;
  Response: string;
 }

export interface Movies {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
 }




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  api = 'c39de0df';
  title = '';


  todos: Movies[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  getMovies() {

    this.http.get<Response>(`http://www.omdbapi.com/?apikey=${this.api}&s=${this.title}`).subscribe(article => {
    this.todos = article.Search;
    console.log(article.Search);
    console.log(this.todos);

    });
  }
}
