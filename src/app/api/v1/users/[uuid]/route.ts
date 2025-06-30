import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getUserByUUID } from '@/services/user.service';

export async function GET(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    // Get the current session to verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify that the user is requesting their own data
    if (session.user.id !== params.uuid) {
      return NextResponse.json(
        { error: 'Forbidden - You can only access your own user data' },
        { status: 403 }
      );
    }

    // Fetch user data from database
    const user = await getUserByUUID(params.uuid);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data (excluding sensitive fields if any)
    return NextResponse.json({
      id: user.id,
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { uuid: string } }
) {
  try {
    // Get the current session to verify authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify that the user is updating their own data
    if (session.user.id !== params.uuid) {
      return NextResponse.json(
        { error: 'Forbidden - You can only update your own user data' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email } = body;

    // Basic validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Update user in database
    const { prisma } = await import('@/lib/prisma-client');
    const updatedUser = await prisma.user.update({
      where: { uuid: params.uuid },
      data: {
        name: name.trim(),
        email: email.trim(),
        updatedAt: new Date()
      }
    });

    // Return updated user data
    return NextResponse.json({
      id: updatedUser.id,
      uuid: updatedUser.uuid,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString()
    });

  } catch (error) {
    console.error('Error updating user:', error);
    
    // Handle unique constraint violation for email
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Email address is already in use' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
