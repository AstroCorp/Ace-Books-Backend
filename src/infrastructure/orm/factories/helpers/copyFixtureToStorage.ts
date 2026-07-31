import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import UuidService from "@/infrastructure/auth/services/uuid.service";

const STORAGE_ROOT = join(process.cwd(), "storage");
const FIXTURES_ROOT = join(process.cwd(), "src/test/storage");
const uuidService = new UuidService();

export type StorageFixture = "example.jpg" | "example.pdf";

export function copyFixtureToStorage(fixture: StorageFixture) {
	mkdirSync(STORAGE_ROOT, { recursive: true });

	const extension = fixture.slice(fixture.lastIndexOf("."));
	const fileUuid = uuidService.get();
	const filename = `${fileUuid}${extension}`;
	const source = join(FIXTURES_ROOT, fixture);
	const destination = join(STORAGE_ROOT, filename);

	copyFileSync(source, destination);

	return {
		filename,
		disk: "local",
		size: statSync(destination).size,
	};
}
