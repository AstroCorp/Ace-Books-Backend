import { PostgresUserReaderRepository } from '@/infrastructure/users/repositories/postgresUserReaderRepository';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAvailableConstraint implements ValidatorConstraintInterface
{
	constructor(
		protected readonly postgresUserReaderRepository: PostgresUserReaderRepository,
	) {
		//
	}

	validate(email: string, args: ValidationArguments) {
		return this.postgresUserReaderRepository.findOneByEmail(email).then(user => {
			return user === null;
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
