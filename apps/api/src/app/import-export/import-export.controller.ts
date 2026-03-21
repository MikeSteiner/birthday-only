import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ImportBirthdaysDto } from './dto/import-birthdays.dto';
import { ImportExportService } from './import-export.service';

@ApiTags('import-export')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('import-export')
export class ImportExportController {
  constructor(private readonly importExportService: ImportExportService) {}

  @Post('birthdays')
  importBirthdays(
    @Request() req: { user: { userId: string } },
    @Body() dto: ImportBirthdaysDto
  ) {
    return this.importExportService.importBirthdays(req.user.userId, dto.birthdays);
  }
}