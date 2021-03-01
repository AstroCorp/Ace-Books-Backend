import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { Lang } from '../../../orm/entities';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsLangAvailableConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(Lang)
        private readonly langRepository: EntityRepository<Lang>
    ) {
        //
    }
    
    async validate(initial: string): Promise<boolean> {
		const lang = await this.langRepository.findOne({ initial });

        if (!lang) {
            return false;
        }

        return true;
	}

	defaultMessage(): string {
		return 'the language is not valid';
	}
}

export function IsLangAvailable(validationOptions?: ValidationOptions) {
    return (object: Record<string, any>, propertyName: string): void => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsLangAvailableConstraint,
        });
    };
}