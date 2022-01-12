import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCheck } from './auth-check';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'auth', loadChildren: async () => (await import('./auth/auth.module')).AuthModule}
    ]
  },
  {
    path: '',
    canActivate: [AuthCheck],
    children: [
      {path: 'users', loadChildren: async () => (await import('./users/users.module')).UsersModule}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
