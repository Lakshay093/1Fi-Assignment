const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isRequired = process.argv.includes('--required');
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(schemaPath)) {
  console.error(`schema.prisma not found at ${schemaPath}`);
  process.exit(1);
}

let schema = fs.readFileSync(schemaPath, 'utf8');
let dbUrl = (process.env.DATABASE_URL || '').trim().replace(/^["']|["']$/g, '');

// Clean any accidentally escaped characters from copy-pasting
dbUrl = dbUrl.replace(/\\([@_])/g, '$1');

const isPostgres = dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://');
const isSqlite = dbUrl.startsWith('file:');

console.log('--- Database Preparation ---');
if (isPostgres) {
  console.log('Target database: PostgreSQL');
  process.env.DATABASE_URL = dbUrl;
  schema = schema.replace(/provider\s*=\s*"[^"]+"/, 'provider = "postgresql"');
  schema = schema.replace(/url\s*=\s*.+/, 'url      = env("DATABASE_URL")');
} else if (isSqlite) {
  console.log('Target database: SQLite (' + dbUrl + ')');
  process.env.DATABASE_URL = dbUrl;
  schema = schema.replace(/provider\s*=\s*"[^"]+"/, 'provider = "sqlite"');
  schema = schema.replace(/url\s*=\s*.+/, 'url      = env("DATABASE_URL")');
} else {
  console.log('Target database: Defaulting to SQLite (file:./dev.db)');
  const defaultSqlite = 'file:./dev.db';
  process.env.DATABASE_URL = defaultSqlite;
  schema = schema.replace(/provider\s*=\s*"[^"]+"/, 'provider = "sqlite"');
  schema = schema.replace(/url\s*=\s*.+/, 'url      = env("DATABASE_URL")');
}

fs.writeFileSync(schemaPath, schema, 'utf8');
console.log('Prisma schema datasource configured.');

// 1. Prisma Generate (always required for build)
try {
  console.log('Running: npx prisma generate');
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
} catch (error) {
  console.error('Failed to generate Prisma client:', error.message);
  process.exit(1);
}

// 2. Database Push & Seed
try {
  console.log('Running: npx prisma db push --accept-data-loss');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env: process.env });

  console.log('Running: npx tsx prisma/seed.ts');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit', env: process.env });

  console.log('Database preparation complete!');
} catch (error) {
  if (isRequired) {
    console.error('Database migration/seed failed during required phase:', error.message);
    process.exit(1);
  } else {
    console.warn('Database push/seed skipped during build phase (will execute during preDeployCommand).');
  }
}
