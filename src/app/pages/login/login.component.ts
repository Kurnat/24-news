import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFireDatabase } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public incorectValues: string;
  users: Observable<any[]>;

  form: FormGroup;


  constructor(
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  async onSubmit(form) {
    console.log('onSubmit1');

    const res = await this.authService.signIn(this.form.value.username, this.form.value.password);
    console.log('res', res);

    if ((res?.user as any)?.email === 'admin@gmail.com') {
      this.authService.setAdminPermission(true);
      this.route.navigate(['/admin/all-news']);

      // if input is valid
      this.incorectValues = '';
      this.form.reset();
    } else {
       // if input is invalid
       this.incorectValues = res.message;
       this.authService.clearPermission();
    }
  }

  ngOnDestroy(): void {}
}
