import { getFakeExecutionContext } from "@/test/integration/helpers/getFakeExecutionContext";
import { SignGuard } from "@/infrastructure/auth/guards/sign.guard";
import SignService from "@/infrastructure/auth/services/sign.service";

describe('Auth - SignGuard (integration)', () => {
	it('Valid signature', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2');
		const urlSigned = new SignService().generate(urlObj);

		const context = getFakeExecutionContext({
			protocol: urlSigned.protocol,
			host: urlSigned.host,
			url: urlSigned.pathname + urlSigned.search,
			body: {},
			method: 'GET',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(true);
	});

	it('Invalid signature', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2&signature=invalid');

		const context = getFakeExecutionContext({
			protocol: urlObj.protocol,
			host: urlObj.host,
			url: urlObj.pathname + urlObj.search,
			body: {},
			method: 'GET',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(false);
	});

	it('Without signature', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2');

		const context = getFakeExecutionContext({
			protocol: urlObj.protocol,
			host: urlObj.host,
			url: urlObj.pathname + urlObj.search,
			body: {},
			method: 'GET',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(false);
	});
});
