const originalDatabaseName = process.env.DATABASE_NAME;

process.env.DATABASE_NAME = `${originalDatabaseName}_test`;
process.env.NODE_ENV = NodeJS.Environment.Testing;
