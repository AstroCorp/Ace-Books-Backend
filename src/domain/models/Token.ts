import { BaseModel, BaseModelDTO } from "./BaseModel";

export const enum TokenType {
	REFRESH = 'refresh',
	RESET = 'reset',
}

interface TokenDTO extends BaseModelDTO {
	user: number;
	token: string;
	type: TokenType;
}

class Token extends BaseModel {
	private _user: number;
	private _token: string;
	private _type: TokenType;

	constructor(tokenDTO: TokenDTO) {
		super(tokenDTO);

		this._user = tokenDTO.user;
		this._token = tokenDTO.token;
		this._type = tokenDTO.type;
	}

	public get user(): number {
		return this._user;
	}

	public get token(): string {
		return this._token;
	}

	public get type(): TokenType {
		return this._type;
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
