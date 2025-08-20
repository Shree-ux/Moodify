import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Todo } from '@/models/Todo'

export async function GET() {
  try {
    await connectToDatabase()
    const todos = await Todo.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json(todos)
  } catch (e: any) {
    console.error('GET /api/todos error:', e)
    return NextResponse.json(
      { error: e?.message || 'Database connection failed' }, 
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    if (!body?.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' }, 
        { status: 400 }
      )
    }

    await connectToDatabase()
    const todo = await Todo.create({ 
      title: body.title.trim(), 
      dueAt: body?.dueAt ? new Date(body.dueAt) : undefined 
    })
    
    return NextResponse.json(todo, { status: 201 })
  } catch (e: any) {
    console.error('POST /api/todos error:', e)
    return NextResponse.json(
      { error: e?.message || 'Failed to create todo' }, 
      { status: 500 }
    )
  }
}


