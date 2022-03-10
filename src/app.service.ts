import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  futsalHome(): string {
    return "Hi it's futsal home.";
  }
}
