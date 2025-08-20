'use client'

import { useEffect, useState } from 'react'

type Todo = {
  _id: string
  title: string
  completed: boolean
  dueAt?: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchTodos() {
    try {
      setError(null)
      const res = await fetch('/api/todos')
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      setTodos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch todos:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch todos')
      setTodos([])
    }
  }

  useEffect(() => { 
    fetchTodos() 
  }, [])

  async function addTodo(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/todos', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ title }) 
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      setTitle('')
      await fetchTodos()
    } catch (err) {
      console.error('Failed to add todo:', err)
      setError(err instanceof Error ? err.message : 'Failed to add todo')
    } finally {
      setLoading(false)
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    try {
      const res = await fetch(`/api/todos/${id}`, { 
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ completed: !completed }) 
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      await fetchTodos()
    } catch (err) {
      console.error('Failed to toggle todo:', err)
      setError(err instanceof Error ? err.message : 'Failed to toggle todo')
    }
  }

  async function removeTodo(id: string) {
    try {
      const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      await fetchTodos()
    } catch (err) {
      console.error('Failed to remove todo:', err)
      setError(err instanceof Error ? err.message : 'Failed to remove todo')
    }
  }

  if (error) {
    return (
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-4">
        <div className="text-red-300 text-sm mb-2">Error: {error}</div>
        <button 
          onClick={fetchTodos} 
          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-4">
      <h3 className="text-lg font-medium mb-3 text-white/90">Tasks</h3>
      {todos.length === 0 ? (
        <div className="text-white/60 text-sm text-center py-4">
          No tasks yet. Add some to get started!
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((t) => (
            <li key={t._id} className="flex items-center justify-between bg-black/30 border border-white/10 rounded px-3 py-2">
              <label className="flex items-center gap-2 flex-1">
                <input 
                  type="checkbox" 
                  checked={t.completed} 
                  onChange={() => toggleTodo(t._id, t.completed)}
                  className="rounded border-white/20"
                />
                <span className={t.completed ? 'line-through text-white/60' : 'text-white/90'}>
                  {t.title}
                </span>
              </label>
              <button 
                className="text-sm text-red-300 hover:text-red-200 transition-colors ml-2" 
                onClick={() => removeTodo(t._id)}
                title="Delete task"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


