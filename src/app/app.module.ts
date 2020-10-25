import { QuillModule } from 'ngx-quill';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

// Core
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ModalAddEditComponent } from './components/admin/modal-add-edit/modal-add-edit.component';
import { CategoryComponent } from './pages/category/category.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { SecondNewsComponent } from './pages/second-news/second-news.component';
import { AdditionalNewsComponent } from './pages/additional-news/additional-news.component';
import { AdditionalComponent } from './pages/additional/additional.component';
import { EditNewsComponent } from './pages/edit-news/edit-news.component';
import { NavbarAdminComponent } from './components/admin/navbar-admin/navbar-admin.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AddNewsComponent } from './pages/add-news/add-news.component';
import { AllNewsComponent } from './pages/all-news/all-news.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NewsComponent } from './pages/news/news.component';
import { environment } from 'environments/environment';
import { NewsDatePipe } from './shared/pipes/news-date.pipe';
import { NewsSearchPipe } from './shared/pipes/news-search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    LoginComponent,
    NavbarAdminComponent,
    NewsPageComponent,
    AdminComponent,
    AddNewsComponent,
    AllNewsComponent,
    NewsComponent,
    ModalAddEditComponent,
    CategoryComponent,
    AdminCategoryComponent,
    SecondNewsComponent,
    AdditionalNewsComponent,
    AdditionalComponent,
    EditNewsComponent,
    NewsDatePipe,
    NewsSearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    SharedModule,
    QuillModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
