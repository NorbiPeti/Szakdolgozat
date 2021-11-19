import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {LoginService} from './shared/login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  request(method: 'post' | 'get' | 'delete', url: string, body: any): Promise<any> {
    return this.http.request(method, environment.backendUrl + url, {
      body,
      headers: {Authorization: 'Bearer ' + this.loginService.token}
    }).toPromise();
  }

  async logout(): Promise<void> {
    await this.request('post', '/users/logout', '');
    this.loginService.token = null;
    this.loginService.user = null;
  }
}
