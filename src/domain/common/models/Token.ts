import Jwt from "@/domain/common/valueObjects/jwt";

export const enum TokenType {
	REFRESH = 'refresh',
	RESET = 'reset',
}

interface Payload {
	userId: number;
	isAdmin: boolean;
	isVerified: boolean;
	iat: number;
	exp: number;
}

interface TokenDTO {
	user: number;
	token: string;
	type: TokenType;
	payload: Payload;
	isRevoked: boolean;
	createdAt: Date;
	updatedAt: Date;
}

class Token {
	private _user: number;
	private _token: Jwt;
	private _type: TokenType;
	private _payload: Payload;
	private _isRevoked: boolean;
	private _createdAt: Date;
	private _updatedAt: Date;

	constructor(tokenDTO: TokenDTO) {
		this._user = tokenDTO.user;
		this._token = new Jwt(tokenDTO.token);
		this._type = tokenDTO.type;
		this._payload = tokenDTO.payload;
		this._isRevoked = tokenDTO.isRevoked;
		this._createdAt = tokenDTO.createdAt;
		this._updatedAt = tokenDTO.updatedAt;
	}

	public get user(): number {
		return this._user;
	}

	public get token(): string {
		return this._token.value;
	}

	public get type(): TokenType {
		return this._type;
	}

	public get payload(): Payload {
		return this._payload;
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

	public checkIfNeedsRefresh(): boolean {
		if (this.type !== TokenType.REFRESH) {
			return false;
		}

		const expMs = this.payload.exp * 1000;

		// Generamos un refresh token si el actual tiene 5 días de antigüedad
		return expMs - Date.now() < 432000000;
	}

	public checkIfIsExpired(): boolean {
		const expMs = this.payload.exp * 1000;
		return expMs < Date.now();
	}

	public toObject(): TokenDTO {
		return {
			user: this.user,
			token: this.token,
			type: this.type,
			payload: this.payload,
			isRevoked: this.isRevoked,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}

export { Token, TokenDTO };
