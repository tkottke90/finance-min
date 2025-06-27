import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Finance Minimum API',
    description: 'RESTful API for Finance Minimum application',
    versions: {
      v1: {
        path: '/api/v1',
        status: 'active',
        description: 'Current stable version'
      }
    },
    documentation: {
      v1: '/api/v1'
    },
    timestamp: new Date().toISOString()
  });
}
