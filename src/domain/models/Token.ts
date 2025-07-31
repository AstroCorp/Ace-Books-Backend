import { BaseModel, BaseModelDTO } from "./BaseModel";

const enum TokenType {
	REFRESH = 'refresh',
	RESET = 'reset',
}

interface TokenDTO extends BaseModelDTO {
	user: number;
	token: string;
	type: TokenType;
}

class Token extends BaseModel {
	private user: number;
	private token: string;
	private type: TokenType;

	constructor(tokenDTO: TokenDTO) {
		super(tokenDTO);

		this.user = tokenDTO.user;
		this.token = tokenDTO.token;
		this.type = tokenDTO.type;
	}

	public toObject(): TokenDTO {
		return {
			...super.toObject(),
			user: this.user,
			token: this.token,
			type: this.type,
		};
	}
}

export { Token, TokenDTO };
