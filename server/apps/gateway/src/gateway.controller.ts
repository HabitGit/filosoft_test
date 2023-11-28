import {Controller, Get, Inject} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {ClientProxy} from "@nestjs/microservices";

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getTest() {
    return this.gatewayService.getTest();
  }
}
