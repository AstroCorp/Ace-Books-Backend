import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAvailableConstraint implements ValidatorConstraintInterface
{
	constructor(
		protected readonly usersService: UsersService,
	) {
		//
	}

	validate(email: string, args: ValidationArguments) {
		return this.usersService.findOneByEmail(email).then(user => {
			if (user) return false;
      		return true;
		});
	}

	defaultMessage(args: ValidationArguments) {
		return 'invalid email';
	}
}

export const IsEmailAvailable = (validationOptions?: ValidationOptions) => {
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
