import {
	Controller,
	Post,
	Body
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Create a user', })
	registerUser(@Body() createUserDto: CreateUserDto) {
	  return this.authService.register(createUserDto);
	}

	@Post('login')
	@ApiOperation({ summary: 'Validate credentials: username (email) and password' })
	loginUser(@Body() loginUserDto: LoginUserDto) {
	  return this.authService.login(loginUserDto);
	}

}
