import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../interfaces/user-role.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({}, { message: 'A senha precisa ser forte' })
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
