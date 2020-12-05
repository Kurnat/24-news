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
  oldImageUrl: string;
  isImageChanged = false;
  fileImg: File;

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
      this.afStorage.storage
        .refFromURL(this.form.get('urlToImage').value)
        .delete()
        .then((res) => {
          console.log(res);
        });
    });
  }

  openEditArticle(template: TemplateRef<any>, article: IArticle): void {
    this.imageUrl = article.urlToImage;

    this.artileId = article.id;
    console.log(this.artileId);

    this.form = new FormGroup({
      author: new FormControl(article.author, Validators.required),
      name: new FormControl(article.name, Validators.required),
      title: new FormControl(article.title, Validators.required),
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

          this.fileImg = undefined;
        });
      } else {
        data.id = this.artileId;

        this.getData();
          // if image isn't same
        console.log(this.oldImageUrl);

        if (this.oldImageUrl) {
          console.log(1);

          console.log(this.fileImg);

          const filePath = `images/${this.uuid()}.${this.fileImg.type.split('/')[1]}`;


          const task = this.afStorage.upload(filePath, this.fileImg);
          this.uploadProgress = task.percentageChanges();
          console.log(2);

          // update
          task.then((e) => {
            this.afStorage
            .ref(`images/${e.metadata.name}`)
            .getDownloadURL()
            .subscribe((url) => {
              this.imageUrl = url;
              this.form.get('urlToImage').setValue(url);

              this.db.updateData({...this.form.value, id: this.artileId, publishedAt: new Date().toString()}).subscribe(() => {
                this.getData();
                this.artileId = null;
                this.imageUrl = undefined;
                this.oldImageUrl = undefined;
                this.isImageChanged = undefined;
                this.fileImg = undefined;
              });

               // delete
              this.afStorage.refFromURL(this.oldImageUrl).delete().subscribe(() => console.log('image deleted'));
            });
          }).catch((e) => console.log(e));
        }

        this.db.updateData({...this.form.value, id: this.artileId, publishedAt: new Date().toString()}).subscribe(() => {
            this.getData();
            this.artileId = null;
            this.imageUrl = undefined;
            this.oldImageUrl = undefined;
            this.isImageChanged = undefined;
            this.fileImg = undefined;
        });

      }
    }

  }

  addArticleToServer() {
    this.chekerAddOrEdit = true;
  }

  editArticleInServer() {
    this.chekerAddOrEdit = false;
  }

  uploadFile(event) {
    this.isImageChanged = true;
    this.fileImg = event.target.files[0];
    const reader  = new FileReader();

    reader.onloadend = () => {
      this.oldImageUrl = this.form.get('urlToImage').value;
      this.imageUrl = reader.result as string;
    };

    if (this.fileImg) {
      reader.readAsDataURL(this.fileImg);
    }
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
