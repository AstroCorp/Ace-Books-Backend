import { Injectable } from '@nestjs/common';
import { UuidPort } from '@/domain/auth/ports/uuid.port';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
class UuidService implements UuidPort {
	get(): string {
		return uuidv4();
	}
}

export default UuidService;
