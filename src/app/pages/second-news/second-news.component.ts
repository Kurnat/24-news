import { Article } from './../../shared/interfaces/article.interface';
import { Component, OnInit } from '@angular/core';
import { NewsSecondService } from 'app/shared/services/news-second.service';

@Component({
  selector: 'app-second-news',
  templateUrl: './second-news.component.html',
  styleUrls: ['./second-news.component.scss']
})
export class SecondNewsComponent implements OnInit {

  articles: Article[];
  constructor(private newsSecondService: NewsSecondService) {}

  ngOnInit(): void {
    this.getSecondNews();
  }

  getSecondNews() {
    this.newsSecondService.getData().subscribe((data: Article[]) => {
      this.articles = data;
    });
  }

}
