import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

import { CommonService } from 'src/common/common.service';
import { JwtPayload } from './interfaces';


@Injectable()
export class AuthService {
	
	constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly commonService: CommonService
    ) {}

	public async register(createUserDto: CreateUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const user = this.userRespository.create({
                ...userData,
                password: bcrypt.hashSync( password, 10 )
            });
            await this.userRespository.save(user);

            delete user.password;
            
            return {
                ...user,
                token: this.getJwtToken({ id: user.id })
            };
        } catch (error) {
            this.commonService.handleErrors(`[AuthService/create]` ,error);
        }
    }

	private getJwtToken(payload: JwtPayload) {
        try {
            const token = this.jwtService.sign( payload );
            return token;
    
        } catch (error) {
            this.commonService.handleErrors('[[AuthService/getJetToken]', error);
        }
    }

	public async login(loginUserDto: LoginUserDto) {
        try {
          const { password, username } = loginUserDto;
    
          const user = await this.userRespository.findOne({ 
            where: { username },
            select: { username: true, password: true, id: true }
          });
    
          if (!user) {
            throw new UnauthorizedException('Credentials are not valid.');
          }
    
          if(!bcrypt.compareSync(password, user.password) ) {
            throw new UnauthorizedException('Credentials are not valid.');
          }
    
          delete user.password;
          return {
            ...user,
            token: this.getJwtToken({ id: user.id })
          };
        } catch (error) {
            this.commonService.handleErrors('[[AuthService/login]', error);
        }
    }

    public async checkAuthStatus(user: User) {
        return {
            ...user,
            token: this.getJwtToken({ id: user.id })
        };
    }


}
