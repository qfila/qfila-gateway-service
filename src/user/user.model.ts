import { Expose, Transform, Exclude } from 'class-transformer';

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

  @Exclude()
  password_hash: string;
}
