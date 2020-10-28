import { DbService } from 'app/shared/services/db.service';
import { ActivatedRoute, Event, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'app/shared/interfaces/category.interface';
import { IArticle } from 'app/shared/interfaces/article.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  news: IArticle[] = [];
  checkLoader: boolean;

  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dbService: DbService
  ) {

    // listening of navigation end and activate page
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        console.log(categoryName);
        this.dbService.getDataByCategoty(categoryName).subscribe(data => {
          console.log(data);
          this.checkLoader = false;
          this.news = data;
        });
      }
    });
   }

  ngOnInit(): void {
    this.checkLoader = true;
  }

}
