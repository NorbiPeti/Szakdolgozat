import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './auth/login.service';
import { Subscription } from 'rxjs';

@Component({
  template: '<h1>Üdv, {{ loginService.user?.name }}!</h1>'
})
export class StartComponent implements OnInit, OnDestroy {
  sub: Subscription;

  constructor(private router: Router, public loginService: LoginService) {
    console.log('Wtf');
  }

  ngOnInit(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.sub = this.loginService.rolesChanged.subscribe(roles => {
      if (!roles) {
        this.router.navigate(['auth', 'login']);
        return;
      }
    });
    const roles = this.loginService.roles;
    console.log('Roles', roles);
    if (roles.includes('admin')) {
      return;
    }
    if (roles.includes('teacher') && !roles.includes('student')) {
      this.router.navigate(['teacher']);
    } else if (roles.includes('student') && !roles.includes('teacher')) {
      this.router.navigate(['student']);
    }
  }

  ngOnDestroy(): void {
    console.log('Unsubscribing');
    this.sub?.unsubscribe();
    this.sub = null;
  }
}
