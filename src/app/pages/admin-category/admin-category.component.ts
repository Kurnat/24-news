import { CommunicationService } from './../../shared/services/communication.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
        nameUA: new FormControl(category.nameUA, Validators.required),
        nameEN: new FormControl(category.nameEN, Validators.required),
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
    if (this.form.valid) {
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

  }

  createNewCategory(template: TemplateRef<any>): void {
    this.checkModalAdd = true;
    this.modalRef = this.modalService.show(template);
    this.form = new FormGroup({
      nameUA: new FormControl('', Validators.required),
      nameEN: new FormControl('', Validators.required),
      color: new FormControl('#000000'),
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

  makeColorTransparent(): void {
    this.form.controls.color.setValue('rgba(0, 0, 0, 0)');
  }

  makeBgTransparent(): void {
    this.form.controls.bgColor.setValue('rgba(0, 0, 0, 0)');
  }
}
