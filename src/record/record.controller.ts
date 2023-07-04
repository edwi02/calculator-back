import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecordService } from './record.service';
import { CreateRecordDto, FindAllRecordDto } from './dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('record')
@ApiTags('Record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Auth()
  @Post()
  create(
    @GetUser() user,
    @Body() createRecordDto: CreateRecordDto
  ) {
    return this.recordService.create(user, createRecordDto);
  }

  @Auth()
  @Get()
  findAll(@Query() findAllDto: FindAllRecordDto) {
    return this.recordService.findAll(findAllDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(id);
  }
}
