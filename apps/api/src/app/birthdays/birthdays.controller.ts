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
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { BirthdaysService } from './birthdays.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBirthdayDto } from './dto/create-birthday.dto';
import { UpdateBirthdayDto } from './dto/update-birthday.dto';

@ApiTags('birthdays')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('birthdays')
export class BirthdaysController {
  constructor(private readonly birthdaysService: BirthdaysService) {}

  @Post()
  @ApiBody({ type: CreateBirthdayDto })
  create(
    @Request() req: { user: { userId: string } },
    @Body() dto: CreateBirthdayDto
  ) {
    return this.birthdaysService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Request() req: { user: { userId: string } }) {
    return this.birthdaysService.findAll(req.user.userId);
  }

  @Get('upcoming')
  getUpcoming(
    @Request() req: { user: { userId: string } },
    @Query('days') days?: string
  ) {
    return this.birthdaysService.getUpcoming(
      req.user.userId,
      days ? Number(days) : 30
    );
  }

  @Get(':id')
  findOne(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string
  ) {
    return this.birthdaysService.findById(id, req.user.userId);
  }

  @Put(':id')
  @ApiBody({ type: UpdateBirthdayDto })
  update(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateBirthdayDto
  ) {
    return this.birthdaysService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  delete(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string
  ) {
    return this.birthdaysService.delete(id, req.user.userId);
  }
}
