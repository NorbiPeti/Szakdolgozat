import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { LoginService } from './auth/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
  }

  request(method: 'post' | 'get' | 'delete' | 'patch', url: string, body: any): Promise<any> {
    return this.http.request(method, environment.backendUrl + url, {
      body,
      headers: {Authorization: 'Bearer ' + this.loginService.token}
    }).toPromise().catch(e => {
      if (e.status === 401) {
        this.loginService.deleteToken();
        return this.router.navigateByUrl('/auth/login');
      } else {
        throw e;
      }
    });
  }

  requestPage<T>(url: string, limit: number, page: number): Promise<T[]> {
    const c = url.indexOf('?') === -1 ? '?' : '&';
    return this.request('get', url + c + 'filter=' + encodeURI(JSON.stringify({
      limit,
      offset: (page - 1) * limit
    })), {});
  }

  requestItemCount(url: string): Promise<number> {
    return this.request('get', url + '/count', {}).then(count => count.count);
  }

  async logout(): Promise<void> {
    await this.request('post', '/users/logout', '');
    this.loginService.deleteToken();
  }
}
