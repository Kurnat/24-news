import { Category } from './../../shared/interfaces/category.interface';
import { CategoryService } from './../../shared/services/category.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categorysArray: Category[] = [];


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategorys().subscribe(
      data => {
        this.categorysArray = data;
      }
    );
  }

}
