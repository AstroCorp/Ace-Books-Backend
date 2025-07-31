import { BaseModel, BaseModelDTO } from "./BaseModel";

interface UserDTO extends BaseModelDTO {
	email: string;
	password: string;
	avatar: string | null;
	isAdmin: boolean;
	isVerified: boolean;
}

class User extends BaseModel {
	private email: string;
	private password: string;
	private avatar: string | null;
	private isAdmin: boolean;
	private isVerified: boolean;

	constructor(userDTO: UserDTO) {
		super(userDTO);

		this.email = userDTO.email;
		this.password = userDTO.password;
		this.avatar = userDTO.avatar;
		this.isAdmin = userDTO.isAdmin;
		this.isVerified = userDTO.isVerified;
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
}

export { User, UserDTO };
