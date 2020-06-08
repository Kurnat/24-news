import { CommunicationService } from './../../shared/services/communication.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from './../../shared/services/category.service';
import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Category } from 'app/shared/interfaces/category.interface';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {

  categorys: Category[];
  modalRef: BsModalRef;
  form: FormGroup;
  id;
  template: TemplateRef<any>;
  checkModalAdd: boolean;
  searsh = '';

  constructor(
    private categoryService: CategoryService,
    private modalService: BsModalService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.getCategoris();
  }

  getCategoris(): void {
    this.categoryService.getAllCategorys().subscribe((data: Category[]) => {
      this.categorys = data;
    });
  }

  openEditCategory(template: TemplateRef<any>, category: Category): void {
    this.checkModalAdd = false;
    this.id = category.id;
    this.form = new FormGroup({
      nameUA: new FormControl(category.nameUA),
      nameEN: new FormControl(category.nameEN),
      color: new FormControl(category.color),
      bgColor: new FormControl(category.bgColor)
    });
    this.modalRef = this.modalService.show(template);
  }

  deletecategory(id: string): void {
    this.categoryService.deleteData(id).subscribe(() => {
    this.communicationService.emitChange();
    this.getCategoris();
    });
  }

  submit(): void {}

  editArticleInServer(): void {
    const categoryData: Category = {
      id: this.id,
      ...this.form.value
    };

    this.categoryService.updateData(categoryData).subscribe(() => {
      this.getCategoris();
      this.communicationService.emitChange();
    });

    this.modalRef.hide();
  }

  createNewCategory(template: TemplateRef<any>): void {
    this.checkModalAdd = true;
    this.modalRef = this.modalService.show(template);
    this.form = new FormGroup({
      nameUA: new FormControl(''),
      nameEN: new FormControl(''),
      color: new FormControl(''),
      bgColor: new FormControl('')
    });
  }

  addArticleToServer(): void {
    const newCategory = this.form.value;
    this.categoryService.setData(newCategory).subscribe(() => {
    this.getCategoris();
    this.communicationService.emitChange();
    });
  }
}
