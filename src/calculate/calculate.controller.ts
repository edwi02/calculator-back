import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';
import { BasicCalculateDto, SquareRootCalculateDto } from './dto';
import { RandomStringCalculateDto } from './dto/random-string-calculate.dto';
import { Auth } from 'src/auth/decorators';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('calculate')
@ApiTags('Calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Auth()
  @Post('/addition')
  addition(
    @GetUser() user,
    @Body() basicCalculateDto: BasicCalculateDto
  ) {
    return this.calculateService.addition(user, basicCalculateDto);
  }

  @Auth()
  @Post('/subtraction')
  subtraction(
    @GetUser() user,
    @Body() basicCalculateDto: BasicCalculateDto
  ) {
    return this.calculateService.subtraction(user, basicCalculateDto);
  }

  @Auth()
  @Post('/multiplication')
  multiplication(
    @GetUser() user,
    @Body() basicCalculateDto: BasicCalculateDto
  ) {
    return this.calculateService.multiplication(user, basicCalculateDto);
  }

  @Auth()
  @Post('/division')
  division(
    @GetUser() user,
    @Body() basicCalculateDto: BasicCalculateDto
  ) {
    return this.calculateService.division(user, basicCalculateDto);
  }

  @Auth()
  @Post('/square-root')
  squareRoot(
    @GetUser() user,
    @Body() squareRootCalculateDto: SquareRootCalculateDto
  ) {
    return this.calculateService.squareRoot(user, squareRootCalculateDto);
  }

  @Auth()
  @Post('/random-string')
  randomString(
    @GetUser() user,
    @Body() randomStringCalculateDto: RandomStringCalculateDto
  ) {
    return this.calculateService.randomString(user, randomStringCalculateDto);
  }

}
