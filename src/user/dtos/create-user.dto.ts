import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';

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
}
