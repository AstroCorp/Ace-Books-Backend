import { createHmac } from "node:crypto";

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

	const fullUrlObj = new URL(origin + pathname + '?' + search);
	const hash = createHmac('sha256', process.env.URL_SIGNED_SECRET)
		.update(fullUrlObj.toString())
		.digest('hex');

	fullUrlObj.searchParams.append('signature', hash);

	return fullUrlObj.toString();
}

export const checkUrlSigned = (url: string) => {
	const urlObj = new URL(url);
	const signatureParam = urlObj.searchParams.get('signature');
	const expiresParam = parseInt(urlObj.searchParams.get('expires'));

	if (!isNaN(expiresParam) && expiresParam < Date.now()) {
		return false;
	}

	urlObj.searchParams.delete('signature');
	urlObj.searchParams.delete('expires');

	const urlSigned = generateUrlSigned(urlObj.toString(), new Date(expiresParam));
	const urlSignedObj = new URL(urlSigned);
	const signature = urlSignedObj.searchParams.get('signature');

	return signatureParam === signature;
}