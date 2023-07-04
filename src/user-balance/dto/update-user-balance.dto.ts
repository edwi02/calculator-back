import { PartialType } from '@nestjs/swagger';
import { CreateUserBalanceDto } from './create-user-balance.dto';

export class UpdateUserBalanceDto extends PartialType(CreateUserBalanceDto) {}
