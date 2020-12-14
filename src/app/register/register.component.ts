import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';
import firebase from 'firebase';
import {LoginService} from '../shared/login.service';
import {Router} from '@angular/router';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  passFormControl = new FormControl('', [
    Validators.required
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
      await this.loginService.createUser(this.emailFormControl.value, this.passFormControl.value);
      await this.router.navigate(['/']);
    } catch (e) {
      alert(e);
    }
  }

}
