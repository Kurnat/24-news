import { CommunicationService } from './../../shared/services/communication.service';
import { FormGroup, FormControl } from '@angular/forms';
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
  private eventsSubscription: Subscription;

  @Input() events: Observable<void>;
  form: FormGroup;

  categorys: Category[] = [];
  constructor(
              private categoryService: CategoryService,
  ) {
    // communicationService.changeEmitted$.subscribe(() => {
    //   console.log(this.article);
    // });
   }

  ngOnInit(): void {
    this.getAllCatogegories();
    this.initFormGroup();
    // this.eventsSubscription = this.events.subscribe((article) => console.log('doSomething()')
    // );

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
      content: new FormControl(this.article.content),
      description: new FormControl(this.article.description),
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
