import { User } from "@/infrastructure/orm/entities/User";

export interface Session {
	user: User;
}
