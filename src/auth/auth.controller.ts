import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authDto.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('signup')
    signup(
        @Body() authDto: AuthDto,        
    ){
        return this.authService.signup(authDto);
    }

    @Post('signin')
    signin(
        @Body() authDto: AuthDto,
    ) {
        return this.authService.signin(authDto);
    }
}
