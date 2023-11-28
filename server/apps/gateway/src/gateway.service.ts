import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class GatewayService {
  constructor(
      @Inject('STUDENTS_SERVICE') private studentsService: ClientProxy,
  ) {}
  getTest() {
    return this.studentsService.send('get-test', 'test')
  }

  getHello() {
    return 'hello you 3';
  }
}
