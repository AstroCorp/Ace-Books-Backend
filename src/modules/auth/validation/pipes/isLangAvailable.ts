import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { Lang } from 'orm/entities';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsLangAvailableConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(Lang)
        private readonly langRepository: EntityRepository<Lang>
    ) {
        //
    }
    
    validate(initial: string) {
		return this.langRepository.findOne({ initial }).then(lang => {
            if (!lang) {
                return false;
            }

            return true;
        });
	}

	defaultMessage() {
		return 'The language is not valid';
	}
}

export function IsLangAvailable(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsLangAvailableConstraint,
        });
    };
}