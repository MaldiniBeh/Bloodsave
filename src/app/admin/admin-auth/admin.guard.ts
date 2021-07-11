import { AuthService } from './../../service/auth-service';
import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-spacing
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree }
from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise((resolve) => {
      if (this.authservice.isready) {
        return resolve(this.isAuthentificate());
      } else {
       const time =  setInterval(() => {
         if (this.authservice.isready) {
           clearInterval(time);
           return resolve(this.isAuthentificate());
          }
        }, 500);
      }
    });
 }

 isAuthentificate(): boolean {
  if (!this.authservice.isAuthticated()){
    this.router.navigateByUrl('/campAdmin');
    return false;
  }
  else {return true; }
 }
}

