import { AdditionalNewsComponent } from './pages/additional-news/additional-news.component';
import { CategoryComponent } from './pages/category/category.component';
import { AllNewsComponent } from './pages/all-news/all-news.component';
import { AddNewsComponent } from './pages/add-news/add-news.component';
import { AdminComponent } from './pages/admin/admin.component';
// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { AdminCategoryComponent } from './pages/admin-category/admin-category.component';
import { AdditionalComponent } from './pages/additional/additional.component';



const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'news-page/:id', component: NewsPageComponent, pathMatch: 'full' },
  { path: 'additional/:id', component: AdditionalComponent, pathMatch: 'full'},
  { path: 'admin', component: AdminComponent, children: [
    {path: 'add-news', component: AddNewsComponent},
    {path: 'all-news', component: AllNewsComponent},
    {path: 'category', component: AdminCategoryComponent},
    {path: 'additional-news', component: AdditionalNewsComponent}
  ]},
  { path: 'profile', loadChildren: () => import('./pages/profile/profile/profile.module').then(m => m.ProfileModule)},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
