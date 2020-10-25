import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { UsersService } from 'modules/users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAvailableConstraint implements ValidatorConstraintInterface {
    constructor(protected  readonly usersService: UsersService) {
        //
    }
    
    validate(email: string, args: ValidationArguments) {
        const [ returnValue ] = args.constraints;

		return this.usersService.findOne(email).then(user => {
            if (user) {
                return !returnValue;
            }

            return returnValue;
        });
	}

	defaultMessage(args: ValidationArguments) {
        const [ returnValue ] = args.constraints;

		return returnValue ? 'email is in use' : 'invalid email';
	}
}

export function IsEmailAvailable(returnValue: boolean = true, validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [returnValue],
            validator: IsEmailAvailableConstraint,
        });
    };
}