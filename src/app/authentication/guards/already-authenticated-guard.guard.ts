import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthenticatedGuardGuard {

  constructor(private loginService: LoginService, private router:Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (this.loginService.isLoggedIn()) {
      this.router.navigateByUrl("/")
      return false
    }    
    return true;
  }
  
}
