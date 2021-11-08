import {Injectable} from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedInUser: firebase.User;

  constructor() {
    firebase.initializeApp((window as any).firebaseCredentials);
    firebase.auth().onAuthStateChanged(user => {
      this.loggedInUser = user;
    });
  }

  async createUser(email: string, pass: string): Promise<void> {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, pass);
  }

  async logout(): Promise<void> {
    await firebase.auth().signOut();
  }

  async login(email: string, pass: string): Promise<void> {
    await firebase.auth().signInWithEmailAndPassword(email, pass);
  }
}
