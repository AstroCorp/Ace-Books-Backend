import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendResetPasswordDto
{
	@ApiProperty()
	@IsEmail()
	email: string;
}
