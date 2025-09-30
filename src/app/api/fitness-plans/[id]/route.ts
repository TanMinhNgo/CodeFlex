import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// GET /api/fitness-plans/[id] - Lấy fitness plan theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Giả lập tìm plan theo ID
    const plan = {
      id,
      name: `Fitness Plan ${id}`,
      userId,
      createdAt: new Date().toISOString(),
      workoutPlan: {
        schedule: ['Monday', 'Wednesday', 'Friday'],
        exercises: []
      },
      dietPlan: {
        dailyCalories: 2000,
        meals: []
      }
    };

    return NextResponse.json(
      { 
        success: true,
        data: plan
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get Plan Error:', error);
    return NextResponse.json(
      { error: 'Plan not found' },
      { status: 404 }
    );
  }
}

// PUT /api/fitness-plans/[id] - Update fitness plan
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await params;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Update plan logic ở đây...
    const updatedPlan = {
      id,
      userId,
      ...body,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(
      { 
        success: true,
        message: 'Plan updated successfully',
        data: updatedPlan
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update Plan Error:', error);
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

// DELETE /api/fitness-plans/[id] - Xóa fitness plan
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    await params; // Get params for validation
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete plan logic ở đây...

    return NextResponse.json(
      { 
        success: true,
        message: 'Plan deleted successfully'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete Plan Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
}