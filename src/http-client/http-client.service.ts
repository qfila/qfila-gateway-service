import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpClientService {
  api: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.api = axios.create({
      headers: {
        'X-API-SECRET': this.configService.get('API_SECRET'),
      },
    });
  }

  async get<T>(url: string) {
    return this.api.get<T>(url);
  }

  async post<T, U = any>(url: string, body: U) {
    return this.api.post<T>(url, body);
  }

  async put<T, U = any>(url: string, body: U) {
    return this.api.put<T>(url, body);
  }

  async delete<T>(url: string) {
    return this.api.delete<T>(url);
  }
}
