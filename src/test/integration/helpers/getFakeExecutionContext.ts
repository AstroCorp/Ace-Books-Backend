import { ExecutionContext } from "@nestjs/common";

interface FakeExecutionContext {
	protocol: string;
	host: string;
	url: string;
	body: Record<string, number | string | boolean>;
	method: string;
}

export const getFakeExecutionContext = (requestData: FakeExecutionContext): ExecutionContext => {
	const mockRequest = {
		protocol: requestData.protocol.split(':')[0],
		headers: {
			host: requestData.host,
		},
		raw: {
			url: requestData.url,
		},
		body: requestData.body,
		method: requestData.method,
	};

	return {
		switchToHttp: () => ({
			getRequest: () => mockRequest,
		}),
	} as unknown as ExecutionContext;
};
