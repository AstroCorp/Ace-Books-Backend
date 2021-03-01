import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { RefreshToken } from '../../../orm/entities';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidRefreshTokenConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: EntityRepository<RefreshToken>
    ) {
        //
    }
    
    async validate(refreshToken: string, args: ValidationArguments): Promise<boolean> {
        const email = args.object['email'] as string;
		const token = await this.refreshTokenRepository.findOne({ token: refreshToken }, ['user']);

        if (!token || token.user.email !== email || new Date(token.expiresIn) < new Date()) {
            return false;
        }
        
        return true;
	}

	defaultMessage(): string {
		return 'invalid refresh token';
	}
}

export function IsValidRefreshToken(validationOptions?: ValidationOptions) {
    return (object: Record<string, any>, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidRefreshTokenConstraint,
        });
    };
}
