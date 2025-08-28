import { User, type UserDTO } from "@/domain/common/models/User";

describe('Domain - Common - Models - User (unit)', () => {
	let userDTO: UserDTO;
	let user: User;

	beforeAll(async () => {
		userDTO = {
			id: 1,
			email: 'test@test.com',
			password: 'password',
			avatar: 'avatar',
			isAdmin: false,
			isVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		user = new User(userDTO);
	});

	it('Check getters', () => {
		expect(user.id).toBe(userDTO.id);
		expect(user.email).toBe(userDTO.email);
		expect(user.password).toBe(userDTO.password);
		expect(user.avatar).toBe(userDTO.avatar);
		expect(user.isAdmin).toBe(userDTO.isAdmin);
		expect(user.isVerified).toBe(userDTO.isVerified);
		expect(user.createdAt).toBe(userDTO.createdAt);
		expect(user.updatedAt).toBe(userDTO.updatedAt);
	});

	it('Check toObject', () => {
		const userObject = user.toObject();

		expect(userObject).toEqual(userDTO);
	});

	it('Check getDataForToken', () => {
		const jti = 'jti';
		const data = user.getDataForToken(jti);

		expect(data).toEqual({
			userId: userDTO.id,
			isAdmin: userDTO.isAdmin,
			isVerified: userDTO.isVerified,
			jti,
		});
	});

	it('Check getDataForProfile', () => {
		const data = user.getDataForProfile();

		expect(data).toEqual({
			email: userDTO.email,
			avatar: userDTO.avatar,
		});
	});
});
