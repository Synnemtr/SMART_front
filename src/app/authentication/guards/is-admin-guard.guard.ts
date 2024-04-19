import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuardGuard {

  constructor(private loginService:LoginService, private router:Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (this.loginService.isAdmin() === true){
      return true;
    } else {
      this.router.navigate(['/tabs/home']);
      return false;
    }
  }
  
}