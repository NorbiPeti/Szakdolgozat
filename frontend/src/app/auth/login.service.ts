import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginGQL, LogoutGQL, UserResult } from '../services/graphql';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenP: string;
  private userP: UserResult;

  get token(): string {
    return this.tokenP;
  }

  get user(): UserResult {
    return this.userP;
  }

  constructor(private http: HttpClient, private loginGQL: LoginGQL, private logoutGQL: LogoutGQL) {
    this.tokenP = window.localStorage.getItem('token');
    this.userP = JSON.parse(window.localStorage.getItem('user'));
  }

  async createUser(email: string, password: string, name: string): Promise<void> {
    await this.http.post(environment.backendUrl + '/users', {email, password, name}).toPromise();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const resp = await this.loginGQL.mutate({email, password}).toPromise();
      this.tokenP = resp.data.login.token;
      this.userP = resp.data.login.user;
      window.localStorage.setItem('token', this.tokenP);
      window.localStorage.setItem('user', JSON.stringify(this.userP));
      return true;
    } catch (e) {
      if (e.status === 401 || e.status === 422) {
        return false;
      }
      throw e;
    }
  }

  deleteToken(): void {
    this.tokenP = null;
    this.userP = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  }

  async logout(): Promise<void> {
    await this.logoutGQL.mutate().toPromise();
    this.deleteToken();
  }
}
