import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { UsersService } from 'modules/users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAvailableConstraint implements ValidatorConstraintInterface {
    constructor(protected  readonly usersService: UsersService) {
        //
    }
    
    validate(email: string) {
		return this.usersService.findOne(email).then(user => {
            if (user) {
                return false;
            }

            return true;
        });
	}

	defaultMessage() {
		return 'El email está en uso';
	}
}

export function IsEmailAvailable(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAvailableConstraint,
        });
    };
}