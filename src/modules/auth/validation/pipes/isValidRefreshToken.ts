import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { RefreshToken } from '../../../../orm/entities';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidRefreshTokenConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: EntityRepository<RefreshToken>
    ) {
        //
    }
    
    validate(refreshToken: string,  args: ValidationArguments) {
		return this.refreshTokenRepository.findOne({ token: refreshToken }, ['user']).then(token => {
            const email = args.object['email'];

            if (!token || token.user.email !== email || new Date(token.expiresIn) < new Date()) {
                return false;
            }
            
            return true;
        });
	}

	defaultMessage() {
		return 'invalid refresh token';
	}
}

export function IsValidRefreshToken(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidRefreshTokenConstraint,
        });
    };
}
