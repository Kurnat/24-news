import { CommunicationService } from './../../shared/services/communication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from './../../shared/services/category.service';
import { Category } from './../../shared/interfaces/category.interface';
import { IArticle } from './../../shared/interfaces/article.interface';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  @Input() article: IArticle;
  @Input() events: Observable<void>;

  private eventsSubscription: Subscription;
  form: FormGroup;
  categorys: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCatogegories();
    this.initFormGroup();
  }

  getAllCatogegories(): void {
    this.categoryService.getAllCategorys().subscribe( (categorys: Category[]) => {
      this.categorys = categorys;
    });
  }

  initFormGroup() {
    this.form = new FormGroup({
      author: new FormControl(this.article.author),
      name: new FormControl(this.article.name),
      title: new FormControl(this.article.title),
      category: new FormControl(this.article.category),
      urlToImage: new FormControl(this.article.urlToImage),
      url: new FormControl(this.article.url),
      content: new FormControl(this.article.content, Validators.required),
      description: new FormControl(this.article.description, Validators.required),
      typeNews: new FormControl(this.article.typeNews)
    });
  }

  addArticleToServer(): void {

  }

  editArticleInServer(): void {

  }

  submit(): void {

  }
}
