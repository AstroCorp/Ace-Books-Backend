import { InjectionToken } from "@nestjs/common";
import { User } from "@/domain/models/User";

export const USER_WRITER_REPOSITORY: InjectionToken = 'USER_WRITER_REPOSITORY';

export interface UserWriterRepositoryInterface {
	create(email: string, password: string): Promise<User>;
}
