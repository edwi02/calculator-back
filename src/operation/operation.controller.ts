import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindAllOperationDto } from './dto/find-all-operation.dto';
import { Auth } from '../auth/decorators/auth.decorator';

@Controller('operation')
@ApiTags('Operation')
export class OperationController {
  constructor(private readonly operationService: OperationService) {}

  @Auth()
  @Post()
  @ApiOperation({ 
    description: 'Create new operation'
  })
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationService.create(createOperationDto);
  }

  @Auth()
  @Get()
  findAll(@Query() findAllDto: FindAllOperationDto) {
    return this.operationService.findAll(findAllDto);
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operationService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOperationDto: UpdateOperationDto) {
    return this.operationService.update(id, updateOperationDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operationService.remove(id);
  }
}
