import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  pass: string;

  constructor(private router: Router, private loginService: LoginService) {
  }


  ngOnInit(): void {
  }

  async doLogin(): Promise<void> {
    await this.loginService.login(this.email, this.pass);
    await this.router.navigate(['/']);
  }
}
