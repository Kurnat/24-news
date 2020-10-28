import { CommunicationService } from './../../shared/services/communication.service';
import { Category } from './../../shared/interfaces/category.interface';
import { CategoryService } from './../../shared/services/category.service';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  categorysArray: Category[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private authService: AuthService,
    private communicationService: CommunicationService
  ) {
    communicationService.changeEmitted$.subscribe(() => {
      this.getAllCategorys();
    });
  }

  ngOnInit(): void {
    this.getAllCategorys();
  }
  getAllCategorys(): void {
    this.categoryService.getAllCategorys().subscribe((data) => {
      this.categorysArray = data;
    });
  }

  public logout() {
    console.log('log');
    this.authService.clearPermission();
    this.router.navigate(['/'], {
      queryParams: { auth: false }
    });
  }
}
