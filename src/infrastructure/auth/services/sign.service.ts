import { Injectable } from "@nestjs/common";
import { createHmac } from "node:crypto";
import { SignPort } from "@/domain/auth/ports/sign.ports";

@Injectable()
class SignService implements SignPort {
	generate(url: URL, expiration?: Date): URL {
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

		return fullUrlObj;
	}

	check(url: URL): boolean {
		const urlObj = new URL(url);
		const signatureParam = urlObj.searchParams.get('signature');
		const expiresParam = parseInt(urlObj.searchParams.get('expires'));

		if (!isNaN(expiresParam) && expiresParam < Date.now()) {
			return false;
		}

		urlObj.searchParams.delete('signature');
		urlObj.searchParams.delete('expires');

		const expires = !isNaN(expiresParam) ? new Date(expiresParam) : undefined;
		const urlSignedObj = this.generate(urlObj, expires);
		const signature = urlSignedObj.searchParams.get('signature');

		return signatureParam === signature;
	}
}

export default SignService;
