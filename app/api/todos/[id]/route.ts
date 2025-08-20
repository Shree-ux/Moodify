import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Todo } from '@/models/Todo'

type Params = { params: { id: string } }

export async function PATCH(req: Request, { params }: Params) {
  try {
    const body = await req.json()
    
    if (!params.id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 })
    }

    await connectToDatabase()
    const todo = await Todo.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    )
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    
    return NextResponse.json(todo)
  } catch (e: any) {
    console.error('PATCH /api/todos/[id] error:', e)
    return NextResponse.json(
      { error: e?.message || 'Failed to update todo' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 })
    }

    await connectToDatabase()
    const todo = await Todo.findByIdAndDelete(params.id)
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('DELETE /api/todos/[id] error:', e)
    return NextResponse.json(
      { error: e?.message || 'Failed to delete todo' }, 
      { status: 500 }
    )
  }
}


