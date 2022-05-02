import { Injectable } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo, private loginService: LoginService, private router: Router) {
  }

  request(method: 'post' | 'get' | 'delete' | 'patch', url: string, body: any): Promise<any> {
    const asd = this.apollo.query({
      query: gql`
        {
          __typename
        }
      `
      // headers: {Authorization: 'Bearer ' + this.loginService.token}
    }).toPromise().then(res => res);
    return asd.catch(e => {
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
