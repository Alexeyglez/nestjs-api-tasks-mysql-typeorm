import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/authDto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private config: ConfigService,
    ){}

    async signup(authDto: AuthDto) {
        const user = await this.usersService.findOneByEmail(authDto.email);

        if(user) {
            throw new BadRequestException('User already exists');
        }
        const hash = await bcryptjs.hash(authDto.password, 10);
        const newUser = await this.usersService.create({
            email: authDto.email,
            password: hash,
        });

        return this.signToken(newUser.id, newUser.email);
    }

    async signin(authDto: AuthDto){
        const user = await this.usersService.findOneByEmail(authDto.email);

        if(!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isCorrectPassword = await bcryptjs.compare(authDto.password, user.password);

        if(!isCorrectPassword) {
            throw new BadRequestException('Invalid credentials');
        }

        return this.signToken(user.id, user.email);
    }

    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwtService.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
      }
}
