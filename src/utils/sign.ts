import { hashSync, verifySync } from '@node-rs/argon2';

export const generateUrlSigned = (url: string, expiration?: Date) => {
	const urlObj = new URL(url);

	if (urlObj.searchParams.has('signature')) {
		throw new Error('"Signature" is a reserved parameter when generating signed routes. Please rename your route parameter.');
	}

	if (urlObj.searchParams.has('expires')) {
		throw new Error('"Expires" is a reserved parameter when generating signed routes. Please rename your route parameter.');
	}

	if (expiration) {
		urlObj.searchParams.append('expires', expiration.getTime().toString());
	}

	urlObj.searchParams.sort();

	const origin = urlObj.origin;
	const pathname = urlObj.pathname === '/' ? '' : urlObj.pathname;
	const search = urlObj.searchParams.toString();
	const fullUrl = origin + pathname + '?' + search;
	const hash = hashSync(fullUrl, {
		secret: Buffer.from(process.env.URL_SIGNED_SECRET),
	});

	return fullUrl + '&signature=' + hash;
}

export const checkUrlSigned = (url: string) => {
	const urlObj = new URL(url);
	const signatureParam = urlObj.searchParams.get('signature');
	const expirationParam = urlObj.searchParams.get('expires');
	const urlWithoutSignature = url.replace(`&signature=${signatureParam}`, '');
	const urlWithoutExpiration = urlWithoutSignature.replace(`&expires=${expirationParam}`, '');

	const urlSigned = generateUrlSigned(urlWithoutExpiration, new Date(parseInt(expirationParam)));
	const urlSignedObj = new URL(urlSigned);
	const signature = urlSignedObj.searchParams.get('signature');

	return verifySync(signatureParam, signature, {
		secret: Buffer.from(process.env.URL_SIGNED_SECRET),
	});
}
