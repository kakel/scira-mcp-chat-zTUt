import { runMigrations } from '@/lib/migrate';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await runMigrations();
    return NextResponse.json({ success: true, message: 'Migrations completed' });
  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json(
      { success: false, error: 'Migration failed' },
      { status: 500 }
    );
  }
}