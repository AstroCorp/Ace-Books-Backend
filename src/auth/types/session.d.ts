import { User } from "@/orm/entities/User";

export interface Session {
	user: User;
}
