import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { Pool } from '@neondatabase/serverless';

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, skipping migrations');
    return;
  }

  try {
    console.log('Starting database migrations...');
    
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    
    await migrate(db, { migrationsFolder: './drizzle' });
    
    console.log('Database migrations completed successfully');
    await pool.end();
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}