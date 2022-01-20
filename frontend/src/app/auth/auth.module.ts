import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../app-routing.module';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {title: 'Bejelentkezés'} as RouteData},
  {path: 'register', component: RegisterComponent, data: {title: 'Regisztráció'} as RouteData}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {
}
