interface HashPort {
	generate(value: string): string;
	check(value: string, hash: string): boolean;
}

export default HashPort;
