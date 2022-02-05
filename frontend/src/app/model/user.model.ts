import { Model } from './model';

export class User extends Model {
  name: string;
  email: string;
  isAdmin = false;
}

export type UserRole = 'teacher' | 'student';

