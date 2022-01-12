import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {FormErrorStateMatcher} from '../../utility/form-error-state-matcher';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  pass = new FormControl('');
  matcher = new FormErrorStateMatcher();

  constructor(private router: Router, private loginService: LoginService) {
  }


  ngOnInit(): void {
  }

  async doLogin(): Promise<void> {
    if (await this.loginService.login(this.email.value, this.pass.value)) {
      await this.router.navigate(['/']);
    } else {
      this.email.setErrors({
        login: true
      });
      this.pass.setErrors({
        login: true
      });
    }
  }
}
