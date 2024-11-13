import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CurrentUser, JwtAuthGuard, UserDto } from '@app/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.scheduleService.create(createScheduleDto, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(
    @Body() updateScheduleDto: UpdateScheduleDto,
    @CurrentUser() user: UserDto,
  ) {
    return this.scheduleService.update(updateScheduleDto, user._id);
  }

  @Get(':consultantId/:productId')
  find(
    @Param('consultantId') consultantId: string,
    @Param('productId') productId: string,
  ) {
    return this.scheduleService.find(consultantId, productId);
  }
}
