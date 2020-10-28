import { Subscription } from 'rxjs';
import { DbService } from 'app/shared/services/db.service';
import { IArticle } from './../../shared/interfaces/article.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsSecondService } from 'app/shared/services/news-second.service';

@Component({
  selector: 'app-second-news',
  templateUrl: './second-news.component.html',
  styleUrls: ['./second-news.component.scss']
})
export class SecondNewsComponent implements OnInit, OnDestroy {

  articles: IArticle[];
  db$: Subscription;
  constructor(private newsSecondService: NewsSecondService,
              private db: DbService) {}

  ngOnInit(): void {
    this.getSecondNews();
  }

  getSecondNews() {
    this.db$ = this.db.getAdditionalData().subscribe((data: IArticle[]) => {
      this.articles = data;
    });
  }

  ngOnDestroy() {
    if (this.db$) { this.db$.unsubscribe(); }
  }

}
