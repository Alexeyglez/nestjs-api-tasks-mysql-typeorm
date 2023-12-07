import { IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../enums/roles.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsIn([Roles.ADMIN, Roles.USER])
    role?: Roles;
}
