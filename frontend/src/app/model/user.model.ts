import { Model } from './model';

export class User extends Model {
  name: string;
  isAdmin: boolean;
}

export type UserRole = 'teacher' | 'student';

