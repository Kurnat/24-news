import { Article } from './../../../shared/interfaces/article.interface';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'app/shared/services/todo.service';
import { News } from 'app/shared/interfaces/article.interface';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit, OnDestroy {
  news$: Subscription;
  response: News;
  constructor(private todoService: TodoService) { }
  public form: FormGroup;

  // page
  p = 1;
  collection: Article[] = [];

  ngOnInit(): void {
    this.form = new FormGroup({

       pageSize: new FormControl('5'),
       category: new FormControl('general'),
       country: new FormControl('ua')

    });
  }

  // to choose page size of news
  newsFislter() {
    this.todoService.pageSize = this.form.get('pageSize').value;
    this.todoService.category = this.form.get('category').value;
    this.todoService.country = this.form.get('country').value;
    this.getNews();
  }

  getNews() {
    // this.todoService.response is a array of news
    this.news$ = this.todoService.getTotos().subscribe((res: News): void => {
      this.response = res;
      this.todoService.response = res;
      this.collection = this.todoService.response.articles;
    },
      //  this.todoService.error object this is a message object to show if something went wrong
      error => {
        this.todoService.error.message = error.message;
        this.todoService.error.status = error.status;
      });
  }

  ngOnDestroy() {
    if (this.news$) {
      this.news$.unsubscribe();
    }
  }
}
