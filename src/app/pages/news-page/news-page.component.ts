import { IArticle } from './../../shared/interfaces/article.interface';
import { DbService } from 'app/shared/services/db.service';
import { CloudService } from 'app/shared/services/cloud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  checker = false;
  public article;
  constructor(
    private activatedRoute: ActivatedRoute,
    private cloudService: CloudService,
    private db: DbService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.db.getById(id).subscribe((data) => {
      if (data) {
        this.article = data;
        this.checker = true;
      } else {
        this.checker = false;
      }
    });

    //   const objData = {
    //     author: dat.author.stringValue,
    //     category: dat.category.stringValue,
    //     content: dat.content.stringValue,
    //     description: dat.description.stringValue,
    //     name: dat.name.stringValue,
    //     publishedAt: dat.publishedAt.stringValue,
    //     title: dat.title.stringValue,
    //     url: dat.url.stringValue,
    //     urlToImage: dat.urlToImage.stringValue,
    //   };
    //   console.log(objData);

    //   this.article = objData;
    // tslint:disable-next-line:new-parens

    // });
  }
}
