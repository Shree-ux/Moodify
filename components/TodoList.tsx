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

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(Array.isArray(data) ? data : [])
  }

  useEffect(() => { fetchTodos() }, [])

  async function addTodo(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await fetch('/api/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) })
      setTitle('')
      await fetchTodos()
    } finally {
      setLoading(false)
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    await fetch(`/api/todos/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed: !completed }) })
    await fetchTodos()
  }

  async function removeTodo(id: string) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    await fetchTodos()
  }

  return (
    <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-4">
      {/* input removed per requirements */}
      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t._id} className="flex items-center justify-between bg-black/30 border border-white/10 rounded px-3 py-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t._id, t.completed)} />
              <span className={t.completed ? 'line-through text-white/60' : ''}>{t.title}</span>
            </label>
            <button className="text-sm text-red-300 hover:text-red-200" onClick={() => removeTodo(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}


