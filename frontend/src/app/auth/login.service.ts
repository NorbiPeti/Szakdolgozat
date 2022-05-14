import { Injectable } from '@angular/core';
import { LoginGQL, LogoutGQL, RegisterGQL, UserResult } from '../services/graphql';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenP: string;
  private userP: UserResult;
  private rolesP: string[];
  private rolesChangedP = new ReplaySubject<string[]>(1);

  get token(): string {
    return this.tokenP;
  }

  get user(): UserResult {
    return this.userP;
  }

  get roles(): string[] {
    return this.rolesP;
  }

  public readonly rolesChanged = this.rolesChangedP.asObservable();

  constructor(private loginGQL: LoginGQL, private logoutGQL: LogoutGQL, private registerGQL: RegisterGQL) {
    this.tokenP = window.localStorage.getItem('token');
    this.userP = JSON.parse(window.localStorage.getItem('user'));
    this.rolesP = JSON.parse(window.localStorage.getItem('roles'));
    this.rolesChangedP.next(this.rolesP);
  }

  async createUser(email: string, password: string, name: string): Promise<void> {
    await this.registerGQL.mutate({user: {email, name, password}}).toPromise();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const resp = await this.loginGQL.mutate({email, password}).toPromise();
      this.tokenP = resp.data.login.token;
      this.userP = resp.data.login.user;
      this.rolesP = resp.data.login.roles;
      window.localStorage.setItem('token', this.tokenP);
      window.localStorage.setItem('user', JSON.stringify(this.userP));
      window.localStorage.setItem('roles', JSON.stringify(this.rolesP));
      this.rolesChangedP.next(this.rolesP);
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
    window.localStorage.removeItem('roles');
    this.rolesChangedP.next();
  }

  async logout(): Promise<void> {
    await this.logoutGQL.mutate().toPromise();
    this.deleteToken();
  }
}
