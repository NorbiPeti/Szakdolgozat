import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCheck } from './auth-check';
import { StartComponent } from './start.component';

const routes: Routes = [
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
      },
      {
        path: 'student',
        loadChildren: async () => (await import('./students/students.module')).StudentsModule,
        data: {title: 'Hallagtói kezdőlap'}
      },
      {
        path: 'teacher',
        loadChildren: async () => (await import('./teachers/teachers.module')).TeachersModule,
        data: {title: 'Oktatói kezdőlap'}
      },
      {
        path: '',
        children: [
          {path: '', component: StartComponent}
        ]
      }
    ]
  },
  {
    path: '',
    children: [
      {path: 'auth', loadChildren: async () => (await import('./auth/auth.module')).AuthModule}
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
