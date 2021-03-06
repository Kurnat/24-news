import { Router } from '@angular/router';
import { CategoryService } from './../../shared/services/category.service';
import { Observable } from 'rxjs';
import { DbService } from 'app/shared/services/db.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Category } from 'app/shared/interfaces/category.interface';
import { Article } from 'app/shared/classes/article.class';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent implements OnInit {
  form: FormGroup;
  imageUrl =
    'https://sisterhoodofstyle.com/wp-content/uploads/2018/02/no-image-1.jpg';
  categoris: Category[];
  // firabase image
  uploadProgress: Observable<number>;

  productImage = '';

  constructor(
    private router: Router,
    private db: DbService,
    private categoryService: CategoryService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.categoryService.getAllCategorys().subscribe((data: Category[]) => {
      this.categoris = data;
    });
  }

  initFormGroup(): void {
    this.form = new FormGroup({
      author: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      category: new FormControl('business'),
      urlToImage: new FormControl(''),
      url: new FormControl('http://localhost:4200'),
      content: new FormControl('',  Validators.required),
      description: new FormControl('', Validators.required),
      typeNews: new FormControl('general'),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const data = new Article({
        publishedAt: new Date().toString(),
        ...this.form.value,
      });
      // adding data to server
      this.db.setData(data).subscribe(() => this.router.navigate(['/']));
    }
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
