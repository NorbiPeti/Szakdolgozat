import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedInUser: string; // TODO

  constructor() {
  }

  async createUser(email: string, pass: string): Promise<void> {
  }

  async logout(): Promise<void> {
  }

  async login(email: string, pass: string): Promise<void> {
  }
}
