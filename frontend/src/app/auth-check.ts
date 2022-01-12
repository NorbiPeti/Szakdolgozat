import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './auth/login.service';

@Injectable()
export class AuthCheck implements CanActivate {
  constructor(private userService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.userService.token && this.userService.user && true;
  }
}
