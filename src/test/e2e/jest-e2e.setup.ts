const originalDatabaseName = process.env.DATABASE_NAME;

process.env.BACKEND_URL = 'http://127.0.0.1:3002';
process.env.DATABASE_NAME = `${originalDatabaseName}_test`;
process.env.NODE_ENV = NodeJS.Environment.Testing;
