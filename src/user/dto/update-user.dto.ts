import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { Roles } from '../enums/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsIn([Roles.ADMIN, Roles.USER])
    role?: Roles;
}
