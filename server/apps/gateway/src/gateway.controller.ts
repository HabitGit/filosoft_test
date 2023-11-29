import {Controller, Get, Param, Query} from '@nestjs/common';
import { GatewayService } from './gateway.service';
import {IQueryParams} from "./interfaces/queryParams.interface";

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello() {
    return this.gatewayService.getHello();
  }

  @Get('/log')
  getGradesLog(@Query() params: IQueryParams) {
    return this.gatewayService.getGradeLog(params);
  }

  @Get('/statistic/:personalCode')
  getPersonalStatistic(@Param() personalCode: number) {
    return this.gatewayService.getPersonalStatistic(personalCode);
  }
}
