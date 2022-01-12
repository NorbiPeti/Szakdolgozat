import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {LoginService} from './auth/login.service';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {UserRole} from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menu: MenuItem[] = [
    {path: 'users', title: 'Felhasználók', requiredRole: 'admin'}
  ];

  constructor(private breakpointObserver: BreakpointObserver, public loginService: LoginService, private api: ApiService,
              private router: Router, private login: LoginService) {
  }

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    await this.api.logout();
    await this.router.navigate(['/']);
  }

  getMenuItems(): MenuItem[] {
    return this.menu.filter(item => item.requiredRole === 'admin' ? this.login.user?.isAdmin : true); // TODO: Roles
  }
}

type MenuItem = { path: string, title: string, requiredRole: UserRole | 'admin' };
