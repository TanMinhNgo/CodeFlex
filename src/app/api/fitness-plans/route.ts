import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// GET /api/fitness-plans - Lấy danh sách fitness plans
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Giả lập data - trong thực tế bạn sẽ query từ database
    const fitnessPlans = [
      {
        id: '1',
        name: 'Beginner Workout',
        userId,
        createdAt: new Date().toISOString(),
        workoutPlan: {
          schedule: ['Monday', 'Wednesday', 'Friday'],
          exercises: [
            {
              day: 'Monday',
              routines: [
                { name: 'Push-ups', sets: 3, reps: 10, description: 'Basic push-ups' }
              ]
            }
          ]
        },
        dietPlan: {
          dailyCalories: 2000,
          meals: [
            {
              name: 'Breakfast',
              foods: ['Oatmeal', 'Banana', 'Greek yogurt']
            }
          ]
        }
      }
    ];

    return NextResponse.json(
      { 
        success: true,
        data: fitnessPlans,
        count: fitnessPlans.length
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/fitness-plans - Tạo fitness plan mới
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate dữ liệu
    if (!body.name || !body.workoutPlan || !body.dietPlan) {
      return NextResponse.json(
        { error: 'Missing required fields: name, workoutPlan, dietPlan' },
        { status: 400 }
      );
    }

    // Tạo fitness plan mới
    const newPlan = {
      id: Date.now().toString(), // Trong thực tế dùng UUID
      userId,
      name: body.name,
      workoutPlan: body.workoutPlan,
      dietPlan: body.dietPlan,
      isActive: body.isActive || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Lưu vào database ở đây...

    return NextResponse.json(
      { 
        success: true,
        message: 'Fitness plan created successfully',
        data: newPlan
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create Plan Error:', error);
    return NextResponse.json(
      { error: 'Failed to create fitness plan' },
      { status: 500 }
    );
  }
}