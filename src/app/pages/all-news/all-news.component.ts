import { Router } from '@angular/router';
import { Category } from './../../shared/interfaces/category.interface';
import { CategoryService } from './../../shared/services/category.service';
import { DbService } from 'app/shared/services/db.service';

import { FormGroup, FormControl } from '@angular/forms';
import { News, Article } from 'app/shared/interfaces/article.interface';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CloudService } from 'app/shared/services/cloud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
})
export class AllNewsComponent implements OnInit {
  modalRef: BsModalRef;
  news: Article[] = [];
  artileId: string;
  chekerAddOrEdit = true;
  categoris: Category[];
  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private db: DbService
  ) {}

  form: FormGroup;
  ngOnInit(): void {
    this.getData();
    this.getCategoris();
  }

  getData() {
    return this.db.getData().subscribe((articles) => {
      this.news = articles;
    });
  }

  getCategoris(): void {
    this.categoryService.getAllCategorys().subscribe( (data: Category[]) => {
      this.categoris = data;
    });
  }

  deleteArticle(id: string) {
    this.db.deleteData(id).subscribe(() => {
      this.getData();
    });
  }

  openEditArticle(template: TemplateRef<any>, article: Article): void {
    console.log(article);
    this.artileId = article.id;
    this.form = new FormGroup({
      author: new FormControl(article.author),
      name: new FormControl(article.name),
      title: new FormControl(article.title),
      category: new FormControl(article.category),
      urlToImage: new FormControl(article.urlToImage),
      url: new FormControl(article.url),
      content: new FormControl(article.content),
      description: new FormControl(article.description),
      typeNews: new FormControl(article.typeNews)
    });

    this.modalRef = this.modalService.show(template);
  }

  submit(): void {
    const data = {
      publishedAt: new Date().toString(),
      ...this.form.value,
    };

    // if Add article
    if (this.chekerAddOrEdit) {
      console.log(data);

      this.db.setData(data).subscribe(() => {
        this.getData();
      });
    } else {
      data.id = this.artileId;
      this.db.updateData(data).subscribe(() => {
        this.getData();

      });
      this.artileId = null;
    }
  }

  addArticleToServer() {
    console.log('addArticleToServer');
    this.chekerAddOrEdit = true;
  }

  editArticleInServer() {
    console.log('editArticleInServer');
    this.chekerAddOrEdit = false;
  }
}
