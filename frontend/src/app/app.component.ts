import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { LoginService } from './auth/login.service';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Route, Router, Routes } from '@angular/router';
import { ApiService } from './api.service';
import { UserRole } from './model/user.model';
import { RouteData } from './app-routing.module';
import { Title } from '@angular/platform-browser';

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
    {path: 'users', requiredRole: 'admin'},
    {path: 'subjects', requiredRole: 'admin'}
  ];

  routeSegments: RouteSegment[];

  pageTitle: string;

  constructor(private breakpointObserver: BreakpointObserver, public loginService: LoginService, private api: ApiService,
              private router: Router, private login: LoginService, private activeRoute: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit(): void {
    for (const item of this.menu) {
      const res = this.getRoutes([{path: item.path, routes: this.router.config}]);
      if (res.length) {
        const data = res[0].currentRoute.data as RouteData;
        item.title = data.title;
      } else {
        item.title = 'NOTFOUND';
      }
    }
    this.setPageTitle();
  }

  getRoutes(data: { path: string, routes: Routes }[]): { routes: Routes, path: string, currentRoute: Route }[] {
    for (const datum of data) {
      const path = datum.path;
      const res = datum.routes.filter(route => path.startsWith(route.path)).map(route => {
        return {
          currentRoute: route,
          routes: route.children ?? [],
          path: path.substring(route.path.length).replace(/^\//, '')
        };
      });
      if (!res.length) {
        continue;
      }
      const ret = this.getRoutes(res);
      if (!ret.length && res.length && res[0].path.length === 0) { // Ha a következő már üres, akkor leellenőrizzük, hogy megtaláltuk-e
        return res;
      } else { // Ha megtaláltuk a megoldást, visszaadjuk végig
        const results = ret.filter(obj => obj.path.length === 0);
        if (results.length) {
          return results;
        }
      }
    }
    return [];
  }

  getRouteSegments(snapshot: ActivatedRouteSnapshot): RouteSegment[] {
    let routeParts: RouteSegment[] = [];
    if (snapshot) {
      if (snapshot.firstChild) {
        routeParts = routeParts.concat(this.getRouteSegments(snapshot.firstChild));
      }
      if (!snapshot.data) {
        return routeParts;
      }
      const data = snapshot.data as RouteData;
      if (data.title && snapshot.url.length) {
        routeParts.push({
          title: data.title,
          url: snapshot.url[0].path
        });
      }
    }
    return routeParts;
  }

  setPageTitle(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const routeParts = this.getRouteSegments(this.activeRoute.snapshot);
      if (!routeParts.length) {
        this.pageTitle = 'Szakdolgozat';
        return this.title.setTitle('Szakdolgozat');
      }
      let pageTitle = routeParts.reverse().map(part => part.title).reduce((partA, partI) => `${partA} > ${partI}`);
      this.pageTitle = pageTitle;
      pageTitle += ` | Szakdolgozat`;
      this.title.setTitle(pageTitle);
    });
  }

  async logout(): Promise<void> {
    await this.api.logout();
    await this.router.navigate(['/']);
  }

  getMenuItems(): MenuItem[] {
    return this.menu.filter(item => item.requiredRole === 'admin' ? this.login.user?.isAdmin : true); // TODO: Roles
  }
}

type MenuItem = { path: string, requiredRole: UserRole | 'admin', title?: string };
type RouteSegment = { title: string, url: string };
