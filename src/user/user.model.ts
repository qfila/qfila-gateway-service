import { Expose, Transform, Exclude } from 'class-transformer';
import { UserRole } from './interfaces/user-role.enum';

export class UserModel {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ value }) => (value ? new Date(value).toISOString() : value))
  created_at: Date;

  @Expose()
  role: UserRole;

  @Exclude()
  password_hash: string;
}
