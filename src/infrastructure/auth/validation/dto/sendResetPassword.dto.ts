import { Transform } from "class-transformer";
import Email from "@/domain/common/valueObjects/email";

export class SendResetPasswordDTO {
	@Transform(({ value }) => new Email(value))
	email: Email;
}
