import { BaseModel, BaseModelDTO } from "@/domain/common/models/BaseModel";
import Email from "@/domain/common/valueObjects/email";
import Password from "@/domain/common/valueObjects/password";

interface UserDTO extends BaseModelDTO {
	email: string;
	password: string;
	avatar: string | null;
	isAdmin: boolean;
	isVerified: boolean;
}

class User extends BaseModel {
	private _email: Email;
	private _password: Password;
	private _avatar: string | null;
	private _isAdmin: boolean;
	private _isVerified: boolean;

	constructor(userDTO: UserDTO) {
		super(userDTO);

		this._email = new Email(userDTO.email);
		this._password = new Password(userDTO.password);
		this._avatar = userDTO.avatar;
		this._isAdmin = userDTO.isAdmin;
		this._isVerified = userDTO.isVerified;
	}

	public get email(): string {
		return this._email.value;
	}

	public get password(): string {
		return this._password.value;
	}

	public get avatar(): string | null {
		return this._avatar;
	}

	public get isAdmin(): boolean {
		return this._isAdmin;
	}

	public get isVerified(): boolean {
		return this._isVerified;
	}

	public toObject(): UserDTO {
		return {
			...super.toObject(),
			email: this.email,
			password: this.password,
			avatar: this.avatar,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified,
		};
	}

	public getDataForToken() {
		return {
			userId: this.id,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified,
		};
	}

	public getDataForProfile() {
		return {
			email: this.email,
			avatar: this.avatar,
			isAdmin: this.isAdmin,
			isVerified: this.isVerified,
		};
	}
}

export { User, UserDTO };
