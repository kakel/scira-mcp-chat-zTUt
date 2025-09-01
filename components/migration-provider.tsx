"use client";

import { useEffect, useState } from "react";

export function MigrationProvider({ children }: { children: React.ReactNode }) {
  const [migrationComplete, setMigrationComplete] = useState(false);

  useEffect(() => {
    async function runMigrations() {
      try {
        const response = await fetch('/api/migrate', { method: 'POST' });
        if (response.ok) {
          console.log('Migrations completed successfully');
        } else {
          console.error('Migration failed:', await response.text());
        }
      } catch (error) {
        console.error('Migration error:', error);
      } finally {
        setMigrationComplete(true);
      }
    }

    runMigrations();
  }, []);

  if (!migrationComplete) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4">Setting up database...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}