import { NextRequest, NextResponse } from 'next/server';

// GET /api/hello
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { 
        message: 'Hello from CodeFlex API!',
        timestamp: new Date().toISOString()
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

// POST /api/hello
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json(
      { 
        message: 'Data received!',
        receivedData: body,
        timestamp: new Date().toISOString()
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('JSON Parse Error:', error);
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    );
  }
}