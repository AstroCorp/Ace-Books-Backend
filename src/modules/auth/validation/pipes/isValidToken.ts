import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { RefreshToken } from 'orm/entities';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsValidTokenConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: EntityRepository<RefreshToken>
    ) {
        //
    }
    
    validate(refreshToken: string) {
		return this.refreshTokenRepository.findOne({ token: refreshToken }).then(token => {
            if (!token || new Date(token.expiresIn) < new Date()) {
                return false;
            }
            
            return true;
        });
	}

	defaultMessage() {
		return 'invalid token';
	}
}

export function IsValidToken(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidTokenConstraint,
        });
    };
}