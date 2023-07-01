import {
	Controller,
	Post,
	Body
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiOperation({ summary: 'Create a user' })
	@ApiCreatedResponse({
	  description: 'User has been successfully created.',
	  type: CreateUserDto,
	})
	registerUser(@Body() createUserDto: CreateUserDto) {
	  return this.authService.register(createUserDto);
	}

	@Post('login')
	@ApiOperation({ summary: 'User login' })
	@ApiCreatedResponse({
	  description: 'Validate credentials: username (email) and password',
	  type: LoginUserDto,
	})
	loginUser(@Body() loginUserDto: LoginUserDto) {
	  return this.authService.login(loginUserDto);
	}

}
