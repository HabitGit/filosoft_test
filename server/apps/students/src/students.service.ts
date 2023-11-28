import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {
  getTest(): string {
    return 'Hello from students!';
  }
}
