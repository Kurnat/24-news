import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Article, News } from 'app/shared/interfaces/article.interface';
import { TodoService } from 'app/shared/services/todo.service';
import { DbService } from 'app/shared/services/db.service';

export interface Response {
  search: [];
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


  news$: Observable<News>;
  // news page
  // p = 1;
  // Array with news article
  // collection: Article[] = [];
  isAdmin: boolean | null = false;



  constructor(public todoService: TodoService,
              private db: DbService) { }

  ngOnInit(): void {
    // this.todoService.getTotos().subscribe((news: News) => {
    //   console.log(news);

    //   this.collection = news.articles;
    // });
    // this.db.getDataByCategoty('sports').subscribe(
    //   data => console.log(data)
    // );

    // this.db.getData().subscribe(data => {
    //   this.collection = data;
    //   console.log(data);

    // });
  }

}
