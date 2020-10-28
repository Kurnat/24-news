import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
        private authService: AuthService,
        private router: Router,
  ) { }
  canActivate( ): Observable<boolean> | Promise<boolean> | boolean {
    // check if user authorized in localStorage
     if (this.authService.getAdminPermission()) {
      console.log('AuthGuard', this.authService.getAdminPermission());
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: { auth: false }
      });
    }
  }
}


// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { AuthLoginService } from '../services/admin-login.service';

// @Injectable({ providedIn: 'root' })
// export class AdminAuthGuard implements CanActivate {
//   constructor(
//           private authLoginService: AuthLoginService,
//           private router: Router
//           ){}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     return this.authLoginService.isAuthenticated().then(isAuth => {
//       if (isAuth) {
//         return true;
//       } else {
//         this.router.navigate(['/admin-login'], {
//           queryParams: {
//             auth: false
//           }
//         });
//       }
//     });
//   }
// }
