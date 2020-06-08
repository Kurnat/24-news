import { DbService } from './../../shared/services/db.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Article } from './../../shared/interfaces/article.interface';
import { NewsSecondService } from './../../shared/services/news-second.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent implements OnInit {

  article: Article;

  bsModalRef: BsModalRef;


  constructor(
    private activatedRoute: ActivatedRoute,
    private newsSecondService: NewsSecondService,
    private db: DbService
  ) { }

  ngOnInit(): void {
    this.getAdditinalNewsById();
  }

  getAdditinalNewsById(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.db.getById(id).subscribe( (data: Article) => {
      this.article = data;
      console.log(data);

    });
  }

}
