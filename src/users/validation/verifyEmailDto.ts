import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto 
{
    @ApiProperty()
    @Length(36, 36, {
        message: 'the code is not valid'
    })
    code: string;
}
