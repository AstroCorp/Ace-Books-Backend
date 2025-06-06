interface SignPort {
	generate(url: URL, expiration?: Date): URL;
	check(url: URL): boolean;
}

export default SignPort;
