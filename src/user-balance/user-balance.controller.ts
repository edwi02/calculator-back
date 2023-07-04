import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBalanceService } from './user-balance.service';
import { UpdateUserBalanceDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user-balance')
@ApiTags('User Balance')
export class UserBalanceController {
  constructor(private readonly userBalanceService: UserBalanceService) {}

  @Get('byUser/:id')
  findOneByUser(@Param('id') id: string) {
    return this.userBalanceService.findOneByUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBalanceDto: UpdateUserBalanceDto) {
    return this.userBalanceService.update(id, updateUserBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBalanceService.remove(id);
  }
}
