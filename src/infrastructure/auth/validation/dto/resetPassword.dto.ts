import { Transform } from "class-transformer";
import Jwt from "@/domain/common/valueObjects/jwt";
import Email from "@/domain/common/valueObjects/email";
import Password from "@/domain/common/valueObjects/password";

export class ResetPasswordDTO {
	@Transform(({ value }) => new Jwt(value))
	token: Jwt;

	@Transform(({ value }) => new Email(value))
	email: Email;

	@Transform(({ value }) => new Password(value))
	password: Password;
}
