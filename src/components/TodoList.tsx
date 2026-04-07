import { Todo } from '../types'
import TodoItem from './TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  filter: string
}

export default function TodoList({ todos, onToggle, onDelete, onEdit, filter }: Props) {
  if (todos.length === 0) {
    const messages: Record<string, string> = {
      all: '할 일을 추가해보세요!',
      active: '모든 할 일을 완료했어요!',
      completed: '완료된 항목이 없어요.',
    }
    return (
      <div className="py-12 text-center text-gray-300 text-sm select-none">
        {messages[filter] ?? '항목이 없어요.'}
      </div>
    )
  }

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
