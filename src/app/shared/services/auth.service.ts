import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  signUp(email: string, password: string) {
    console.log('signUp');

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        const user = {
          id: userResponse.user.uid,
          username: userResponse.user.email,
          role: 'admin',
        };

        this.firestore
          .collection('users')
          .add(user)
          .then((data) => {
            data
              .get()
              .then((res) => {
                console.log(res.data());
                return res.data();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  signIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  }

  getAdminPermission(): boolean {
    const testAuth: string | null = localStorage.getItem('testAuth');
    return JSON.parse(testAuth);
  }

  setAdminPermission(permission: boolean): void {
    const testAuth: string | null = JSON.stringify(permission);
    localStorage.setItem('testAuth', testAuth);
  }

  clearPermission(): void {
    localStorage.removeItem('testAuth');
  }
}
