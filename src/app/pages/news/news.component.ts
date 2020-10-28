import { IArticle } from 'app/shared/interfaces/article.interface';
import { DbService } from 'app/shared/services/db.service';

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from 'app/shared/services/todo.service';
import { CloudService } from 'app/shared/services/cloud.service';
import { AngularFirestore } from '@angular/fire/firestore';




@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-output-on-prefix
  @Input() article;

  // news$: Subscription;

  news: IArticle[] = [];

  constructor(private cloudService: CloudService,
              private angularFirestore: AngularFirestore,
              private db: DbService) { }

  ngOnInit(): void {
    // this.cloudService.getData().subscribe(articles => {
    //   this.news
    //   = articles.map( todo => {
    //     return {
    //       id: todo.payload.doc.id,
    //       ...todo.payload.doc.data()
    //     };
    //   });
    // });

    this.db.getGeneralData().subscribe(articles => {

      this.news = articles;

    });
  }


  ngOnDestroy(): void {
    // this.news$.unsubscribe();
  }

}
