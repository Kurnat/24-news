import { CommunicationService } from './../../shared/services/communication.service';
import { IArticle } from './../../shared/interfaces/article.interface';
import { NewsSecondService } from './../../shared/services/news-second.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-additional-news',
  templateUrl: './additional-news.component.html',
  styleUrls: ['./additional-news.component.scss']
})
export class AdditionalNewsComponent implements OnInit, OnDestroy {

  // private eventsSubscription: Subscription;

  article: IArticle;

  @Input() events: Observable<void>;


  artileForEdit: IArticle;
  articles: IArticle[];

  eventsSubject: Subject<void> = new Subject<void>();

  editModal: boolean;
  constructor(
              private newsSecondService: NewsSecondService,
  ) { }

  ngOnInit(): void {
    this.getNewsArticles();
    // this.eventsSubscription = this.events.subscribe((data) => console.log(data));
  }



  getNewsArticles() {
    this.newsSecondService.getData().subscribe((data: IArticle[]) => {
      this.articles = data;
    });
  }

  // open modal to Edit the category
  openEditArticle(template, article: IArticle) {
    this.editModal = true;
    this.article = article;
    this.artileForEdit = article;
    // this.eventsSubject.next(article);
  }

  deleteArticle(id: string) {

  }

  // open modal to Add new category
  createNewCategory(template) {
    this.editModal = false;
  }


  ngOnDestroy() {
    // this.eventsSubscription.unsubscribe();
  }

}
