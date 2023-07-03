import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto, FindAllRecordDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('record')
@ApiTags('Record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  findAll(@Query() findAllDto: FindAllRecordDto) {
    return this.recordService.findAll(findAllDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordService.remove(id);
  }
}
