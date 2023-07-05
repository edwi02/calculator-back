import {
	Controller,
	Post,
	Body,
	Get
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from './entities/user.entity';
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

	@Get('check-status')
	@Auth()
	@ApiOperation({ summary: 'Check user status, active or inactive' })
	checkAuthStatus(
	  @GetUser() user: User,
	) {
	  return this.authService.checkAuthStatus(user);
	}

}
