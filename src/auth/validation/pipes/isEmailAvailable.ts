import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { UsersService } from '../../../users/users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAvailableConstraint implements ValidatorConstraintInterface
{
	constructor(
		protected readonly usersService: UsersService,
	) {
		//
	}

	async validate(email: string, args: ValidationArguments): Promise<boolean> {
		const returnValue = args.constraints[0] as boolean;
		const user = await this.usersService.findOne(email);

		if (user) {
			return !returnValue;
		}

		return returnValue;
	}

	defaultMessage(args: ValidationArguments): string {
		const returnValue = args.constraints[0] as boolean;

		return returnValue ? 'email is in use' : 'invalid email';
	}
}

export function IsEmailAvailable(returnValue = true, validationOptions?: ValidationOptions) {
	return (object: Record<string, any>, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [returnValue],
			validator: IsEmailAvailableConstraint,
		});
	};
}
