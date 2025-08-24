export const enum TokenType {
	REFRESH = 'refresh',
	RESET = 'reset',
}

interface TokenDTO {
	user: number;
	token: string;
	type: TokenType;
	isRevoked: boolean;
	createdAt: Date;
	updatedAt: Date;
}

class Token {
	private _user: number;
	private _token: string;
	private _type: TokenType;
	private _isRevoked: boolean;
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor(tokenDTO: TokenDTO) {
		this._user = tokenDTO.user;
		this._token = tokenDTO.token;
		this._type = tokenDTO.type;
		this._isRevoked = tokenDTO.isRevoked;
		this._createdAt = tokenDTO.createdAt;
		this._updatedAt = tokenDTO.updatedAt;
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

	public get isRevoked(): boolean {
		return this._isRevoked;
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}

	public toObject(): TokenDTO {
		return {
			user: this.user,
			token: this.token,
			type: this.type,
			isRevoked: this.isRevoked,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export { Token, TokenDTO };
