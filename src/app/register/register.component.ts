import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators} from '@angular/forms';

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

  constructor() {
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
    console.log('Checking ' + code);
    const error = this.emailFormControl.hasError(code);
    console.log('Error: ' + error);
    if (!error) {
      return false;
    }
    console.log('Checking codes...');
    for (const ec of this.emailErrorCodes) {
      console.log('ec: ' + ec);
      if (ec === code) {
        break;
      }
      console.log('It\'s different');
      if (this.emailFormControl.hasError(ec)) {
        return false;
      }
      console.log('No error for ec');
    }
    return error;
  }

  ngOnInit(): void {
  }

  doLogin(): void {
    alert('Login');
  }

}
