import { NextResponse } from 'next/server'
import { memoryStorage } from '@/lib/memoryStorage'
import { connectToDatabase } from '@/lib/mongodb'
import { Todo } from '@/models/Todo'

// Check if we have MongoDB URI (production) or use memory storage (development)
const useMongoDB = !!process.env.MONGODB_URI

export async function GET() {
  try {
    if (useMongoDB) {
      await connectToDatabase()
      const todos = await Todo.find().sort({ createdAt: -1 }).lean()
      return NextResponse.json(todos)
    } else {
      const todos = await memoryStorage.getAllTodos()
      return NextResponse.json(todos)
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Storage error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    if (useMongoDB) {
      await connectToDatabase()
      const todo = await Todo.create({ title: body?.title, dueAt: body?.dueAt })
      return NextResponse.json(todo, { status: 201 })
    } else {
      const todo = await memoryStorage.createTodo({ title: body?.title, dueAt: body?.dueAt })
      return NextResponse.json(todo, { status: 201 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Storage error' }, { status: 500 })
  }
}


