import { ModalModule } from 'ngx-bootstrap/modal';
// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';


// utilits

// Components






@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Firebase
    AngularFireStorageModule,

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule,
    AngularFireStorageModule,
    ModalModule,
  ],
  providers: [
    AngularFirestore,
  ]
})
export class SharedModule { }
