import { NextResponse } from 'next/server'
import { memoryStorage } from '@/lib/memoryStorage'
import { connectToDatabase } from '@/lib/mongodb'
import { Todo } from '@/models/Todo'

type Params = { params: { id: string } }

// Check if we have MongoDB URI (production) or use memory storage (development)
const useMongoDB = !!process.env.MONGODB_URI

export async function PATCH(req: Request, { params }: Params) {
  try {
    const body = await req.json()
    
    if (useMongoDB) {
      await connectToDatabase()
      const todo = await Todo.findByIdAndUpdate(
        params.id,
        { $set: body },
        { new: true }
      )
      if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
      }
      return NextResponse.json(todo)
    } else {
      const todo = await memoryStorage.updateTodo(params.id, body)
      if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
      }
      return NextResponse.json(todo)
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Storage error' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    if (useMongoDB) {
      await connectToDatabase()
      const todo = await Todo.findByIdAndDelete(params.id)
      if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
      }
      return NextResponse.json({ ok: true })
    } else {
      const success = await memoryStorage.deleteTodo(params.id)
      if (!success) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
      }
      return NextResponse.json({ ok: true })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Storage error' }, { status: 500 })
  }
}


