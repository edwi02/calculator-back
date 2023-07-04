import { Controller, Get, Body, Patch, Param, Delete, Post } from '@nestjs/common';
import { UserBalanceService } from './user-balance.service';
import { CreateUserBalanceDto, UpdateUserBalanceDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { GetUser, RoleProtected } from 'src/auth/decorators';

@Controller('user-balance')
@ApiTags('User Balance')
export class UserBalanceController {
  constructor(private readonly userBalanceService: UserBalanceService) {}

  @RoleProtected(ValidRoles.admin)
  @Auth()
  @Post()
  create(
    @GetUser() user,
    @Body() createUserBalanceDto: CreateUserBalanceDto
  ) {
    return this.userBalanceService.create(user, createUserBalanceDto);
  }

  @Auth()
  @Get('byUser/:id')
  findOneByUser(@Param('id') id: string) {
    return this.userBalanceService.findOneByUser(id);
  }

  @RoleProtected(ValidRoles.admin)
  @Auth()
  @Patch(':id')
  update(
    @GetUser() user,
    @Param('id') id: string,
    @Body() updateUserBalanceDto: UpdateUserBalanceDto
  ) {
    return this.userBalanceService.update(user, id, updateUserBalanceDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBalanceService.remove(id);
  }
}
