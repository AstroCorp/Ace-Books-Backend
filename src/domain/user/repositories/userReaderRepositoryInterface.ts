import { InjectionToken } from "@nestjs/common";
import { User } from "@/domain/models/User";

export const USER_READER_REPOSITORY: InjectionToken = 'USER_READER_REPOSITORY';

export interface UserReaderRepositoryInterface {
	findOneByEmail(email: string): Promise<User | null>;
}
