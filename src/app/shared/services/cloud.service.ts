import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  // constructor(private firestore: AngularFirestore) {}

  // getDataById(id) {
  //   return this.firestore.collection('news').doc(id).get();
  // }
  // getData(): any {
  //   return this.firestore.collection('news').snapshotChanges();
  // }

  // setData(data: any): any {
  //   return this.firestore.collection('news').add(data);
  // }

  // deleteData(id: string) {
  //   this.firestore.doc('news/' + id).delete();
  // }

  // updateData(id: string, data) {
  //   this.firestore.doc('news/' + id).update(data);
  // }
}
