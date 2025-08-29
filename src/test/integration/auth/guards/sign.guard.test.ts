import { getFakeExecutionContext } from "@/test/integration/helpers/getFakeExecutionContext";
import { SignGuard } from "@/infrastructure/auth/guards/sign.guard";
import SignService from "@/infrastructure/auth/services/sign.service";

describe('Auth - SignGuard (integration)', () => {
	it('GET - Valid signature', () => {
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

	it('GET - Invalid signature', () => {
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

	it('GET - Without signature', () => {
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

	it('POST - Valid signature', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2');
		const body = {
			param1: 'value1',
			param2: 'value2',
		};

		const bodyString = JSON.stringify(body);
		urlObj.searchParams.set('body', bodyString);

		const urlSigned = new SignService().generate(urlObj);
		urlSigned.searchParams.delete('body');

		const context = getFakeExecutionContext({
			protocol: urlSigned.protocol,
			host: urlSigned.host,
			url: urlSigned.pathname + urlSigned.search,
			body,
			method: 'POST',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(true);
	});

	it('POST - Invalid signature (missing param)', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2');
		const body = {
			param1: 'value1',
			param2: 'value2',
		};

		const bodyString = JSON.stringify(body);
		urlObj.searchParams.set('body', bodyString);

		const urlSigned = new SignService().generate(urlObj);
		urlSigned.searchParams.delete('body');
		urlSigned.searchParams.delete('param1');

		const context = getFakeExecutionContext({
			protocol: urlSigned.protocol,
			host: urlSigned.host,
			url: urlSigned.pathname + urlSigned.search,
			body,
			method: 'POST',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(false);
	});

	it('POST - Invalid signature (missing body param)', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2');
		const body = {
			param1: 'value1',
			param2: 'value2',
		};

		const bodyString = JSON.stringify(body);
		urlObj.searchParams.set('body', bodyString);

		const urlSigned = new SignService().generate(urlObj);
		urlSigned.searchParams.delete('body');

		const context = getFakeExecutionContext({
			protocol: urlSigned.protocol,
			host: urlSigned.host,
			url: urlSigned.pathname + urlSigned.search,
			body: {
				param2: 'value2',
			},
			method: 'POST',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(false);
	});

	it('POST - Without signature', () => {
		const urlObj = new URL('http://localhost:3001/api/test?param1=value1&param2=value2');
		const body = {
			param1: 'value1',
			param2: 'value2',
		};

		const context = getFakeExecutionContext({
			protocol: urlObj.protocol,
			host: urlObj.host,
			url: urlObj.pathname + urlObj.search,
			body,
			method: 'POST',
		});
		const signGuard = new SignGuard(new SignService());
		const result = signGuard.canActivate(context);

		expect(result).toBe(false);
	});
});
