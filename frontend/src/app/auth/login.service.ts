import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenP: string;
  private userP: User;

  get token(): string {
    return this.tokenP;
  }

  get user(): User {
    return this.userP;
  }

  constructor(private http: HttpClient) {
    this.tokenP = window.localStorage.getItem('token');
    this.userP = JSON.parse(window.localStorage.getItem('user'));
  }

  async createUser(email: string, password: string, name: string): Promise<void> {
    await this.http.post(environment.backendUrl + '/users', {email, password, name}).toPromise();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const resp = await this.http.post<{ token: string, user: User }>(environment.backendUrl + '/users/login', {
        email,
        password
      }).toPromise();
      this.tokenP = resp.token;
      this.userP = resp.user;
      window.localStorage.setItem('token', resp.token);
      window.localStorage.setItem('user', JSON.stringify(resp.user));
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
}
