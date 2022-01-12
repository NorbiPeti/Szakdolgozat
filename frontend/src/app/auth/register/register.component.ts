import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {FormErrorStateMatcher} from '../../utility/form-error-state-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
    RegisterComponent.validateUniEmail
  ]);

  nameFormControl = new FormControl('', [
    Validators.pattern(/([A-Za-z-.]+ )+[A-Za-z-.]+/)
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  matcher = new FormErrorStateMatcher();

  private emailErrorCodes: string[] = [
    'required',
    'email',
    'unimail'
  ];

  private static validateUniEmail(control: AbstractControl): ValidationErrors {
    if (control.value.endsWith('u-szeged.hu')) {
      return null;
    }
    return {unimail: true};
  }

  /**
   * Egy adott tipusú hiba ellenőrzése úgy, hogy egyszerre csak egy hibatipust jelezzen.
   * @param code Az ellenőrizendő hibatipus
   */
  emailHasError(code: string): boolean {
    const error = this.emailFormControl.hasError(code);
    if (!error) {
      return false;
    }
    for (const ec of this.emailErrorCodes) {
      if (ec === code) {
        break;
      }
      if (this.emailFormControl.hasError(ec)) {
        return false;
      }
    }
    return error;
  }

  ngOnInit(): void {
  }

  async doRegister(): Promise<void> {
    if (this.emailFormControl.errors !== null) {
      return;
    }
    try {
      await this.loginService.createUser(this.emailFormControl.value, this.passFormControl.value, this.nameFormControl.value);
      await this.router.navigate(['/']);
    } catch (e) {
      alert(e);
    }
  }

}
