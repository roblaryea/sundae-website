'use client';

import { useEffect } from 'react';
import { REPORT_APP_URL } from '@/lib/urls';

export default function BenchmarkingRedirect() {
  useEffect(() => {
    // Redirect to external Report app for benchmarking
    window.location.href = REPORT_APP_URL;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Sundae Report...</p>
      </div>
    </div>
  );
}
