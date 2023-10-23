import { Injectable } from '@nestjs/common';
import { HttpClientService } from 'src/http-client/http-client.service';
import { ConfigService } from '@nestjs/config';
import { UserModel } from './user.model';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  async findByEmail(email: string) {
    const url = `${this.baseUrl}?email=${email}`;

    const { data: user } = await this.httpClientService.get<UserModel>(url);

    return user;
  }

  async findById(id: string) {
    const url = `${this.baseUrl}/${id}`;

    const { data: user } = await this.httpClientService.get<UserModel>(url);

    return user;
  }

  async signUp(body: CreateUserDTO) {
    const url = this.baseUrl;

    const { data: user } = await this.httpClientService.post<UserModel>(
      url,
      body,
    );

    return user;
  }

  private get baseUrl() {
    return this.configService.get('USER_API_BASE_URL');
  }
}
