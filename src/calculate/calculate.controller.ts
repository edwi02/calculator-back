import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalculateService } from './calculate.service';
import { BasicCalculateDto, SquareRootCalculateDto } from './dto';
import { RandomStringCalculateDto } from './dto/random-string-calculate.dto';

@Controller('calculate')
@ApiTags('Calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post('/addition')
  addition(@Body() basicCalculateDto: BasicCalculateDto) {
    return this.calculateService.additional(basicCalculateDto);
  }

  @Post('/subtraction')
  subtraction(@Body() basicCalculateDto: BasicCalculateDto) {
    return this.calculateService.subtraction(basicCalculateDto);
  }

  @Post('/multiplication')
  multiplication(@Body() basicCalculateDto: BasicCalculateDto) {
    return this.calculateService.multiplication(basicCalculateDto);
  }

  @Post('/division')
  division(@Body() basicCalculateDto: BasicCalculateDto) {
    return this.calculateService.division(basicCalculateDto);
  }

  @Post('/square-root')
  squareRoot(@Body() squareRootCalculateDto: SquareRootCalculateDto) {
    return this.calculateService.squareRoot(squareRootCalculateDto);
  }

  @Post('/random-string')
  randomString(@Body() randomStringCalculateDto: RandomStringCalculateDto) {
    return this.calculateService.randomString(randomStringCalculateDto);
  }

}
