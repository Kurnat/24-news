import { Router } from '@angular/router';
import { Category } from './../../shared/interfaces/category.interface';
import { CategoryService } from './../../shared/services/category.service';
import { DbService } from 'app/shared/services/db.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { News, IArticle } from 'app/shared/interfaces/article.interface';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CloudService } from 'app/shared/services/cloud.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss'],
})
export class AllNewsComponent implements OnInit {
  modalRef: BsModalRef;
  news: IArticle[] = [];
  artileId: string;
  chekerAddOrEdit = true;
  categoris: Category[];
  uploadProgress: Observable<number>;
  imageUrl: string;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private db: DbService,
    private afStorage: AngularFireStorage
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
    this.categoryService.getAllCategorys().subscribe((data: Category[]) => {
      this.categoris = data;
    });
  }

  deleteArticle(id: string) {
    this.db.deleteData(id).subscribe(() => {
      this.getData();
    });
  }

  openEditArticle(template: TemplateRef<any>, article: IArticle): void {
    this.imageUrl = article.urlToImage;
    console.log(article.urlToImage);

    this.artileId = article.id;
    this.form = new FormGroup({
      author: new FormControl(article.author),
      name: new FormControl(article.name),
      title: new FormControl(article.title),
      category: new FormControl(article.category),
      urlToImage: new FormControl(article.urlToImage),
      url: new FormControl(article.url),
      content: new FormControl(article.content, Validators.required),
      description: new FormControl(article.description, Validators.required),
      typeNews: new FormControl(article.typeNews),
    });

    this.modalRef = this.modalService.show(template);
  }

  submit(): void {
    if (this.form.valid) {
      this.editArticleInServer();
      this.modalRef.hide();
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
  }

  addArticleToServer() {
    console.log('addArticleToServer');
    this.chekerAddOrEdit = true;
  }

  editArticleInServer() {
    console.log('editArticleInServer');
    this.chekerAddOrEdit = false;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then((e) => {
      this.afStorage
        .ref(`images/${e.metadata.name}`)
        .getDownloadURL()
        .subscribe((url) => {
          this.imageUrl = url;
          console.log(url);
          this.form.get('urlToImage').setValue(url);
          console.log(this.form.value);
        });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
