import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BirthdaysService } from './birthdays.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

class CreateBirthdayDto {
  name!: string;
  birthDay!: number;
  birthMonth!: number;
  birthYear?: number;
}

class UpdateBirthdayDto {
  name?: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
}

@ApiTags('birthdays')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('birthdays')
export class BirthdaysController {
  constructor(private readonly birthdaysService: BirthdaysService) {}

  @Post()
  async create(@Request() req: any, @Body() createDto: CreateBirthdayDto) {
    return this.birthdaysService.create(req.user.userId, createDto);
  }

  @Get()
  async findAll(@Request() req: any) {
    return this.birthdaysService.findAll(req.user.userId);
  }

  @Get('upcoming')
  async getUpcoming(@Request() req: any, @Query('days') days?: number) {
    return this.birthdaysService.getUpcoming(
      req.user.userId,
      days ? parseInt(days.toString()) : 30
    );
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.birthdaysService.findById(id, req.user.userId);
  }

  @Put(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateDto: UpdateBirthdayDto
  ) {
    return this.birthdaysService.update(id, req.user.userId, updateDto);
  }

  @Delete(':id')
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.birthdaysService.delete(id, req.user.userId);
  }
}
