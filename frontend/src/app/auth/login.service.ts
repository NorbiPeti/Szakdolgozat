import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;
  user: User;

  constructor(private http: HttpClient) {
  }

  async createUser(email: string, password: string, name: string): Promise<void> {
    await this.http.post(environment.backendUrl + '/users', {email, password, name}).toPromise();
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const resp: any = await this.http.post(environment.backendUrl + '/users/login', {email, password}).toPromise();
      this.token = resp.token;
      this.user = resp.user;
      return true;
    } catch (e) {
      if (e.status === 401 || e.status === 422) {
        return false;
      }
      throw e;
    }
  }
}
