// Simple in-memory storage for development
// This replaces MongoDB for local development

export interface TodoItem {
  _id: string
  title: string
  completed: boolean
  dueAt?: string
  createdAt: string
  updatedAt: string
}

let todos: TodoItem[] = []
let nextId = 1

export const memoryStorage = {
  async getAllTodos(): Promise<TodoItem[]> {
    return [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  async createTodo(data: { title: string; dueAt?: string }): Promise<TodoItem> {
    const now = new Date().toISOString()
    const todo: TodoItem = {
      _id: `todo_${nextId++}`,
      title: data.title,
      completed: false,
      dueAt: data.dueAt,
      createdAt: now,
      updatedAt: now
    }
    todos.push(todo)
    return todo
  },

  async updateTodo(id: string, data: Partial<{ title: string; completed: boolean; dueAt?: string }>): Promise<TodoItem | null> {
    const index = todos.findIndex(todo => todo._id === id)
    if (index === -1) return null
    
    todos[index] = {
      ...todos[index],
      ...data,
      updatedAt: new Date().toISOString()
    }
    return todos[index]
  },

  async deleteTodo(id: string): Promise<boolean> {
    const index = todos.findIndex(todo => todo._id === id)
    if (index === -1) return false
    
    todos.splice(index, 1)
    return true
  }
}
