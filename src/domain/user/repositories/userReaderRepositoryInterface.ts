import { InjectionToken } from "@nestjs/common";
import { User } from "@/domain/common/models/User";

export const USER_READER_REPOSITORY: InjectionToken = 'USER_READER_REPOSITORY';

export interface UserReaderRepositoryInterface {
	findOneByEmail(email: string): Promise<User | null>;
	findOneById(id: number): Promise<User | null>;
}
