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
      {
        path: 'users',
        loadChildren: async () => (await import('./users/users.module')).UsersModule,
        data: {title: 'Felhasználók'} as RouteData
      },
      {
        path: 'subjects',
        loadChildren: async () => (await import('./subjects/subjects.module')).SubjectsModule,
        data: {title: 'Tárgyak'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export type RouteData = { title: string; };
