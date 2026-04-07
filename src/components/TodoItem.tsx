import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commitEdit = () => {
    onEdit(todo.id, editValue)
    setEditing(false)
  }

  const cancelEdit = () => {
    setEditValue(todo.text)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <li
      className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        aria-label={todo.completed ? '완료 취소' : '완료 표시'}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text / Edit Input */}
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitEdit}
          className="flex-1 text-base text-gray-700 bg-transparent border-b-2 border-indigo-400 outline-none py-0.5"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={`flex-1 text-base cursor-default select-none transition-all ${
            todo.completed
              ? 'line-through text-gray-300'
              : 'text-gray-700'
          }`}
          title="더블클릭으로 편집"
        >
          {todo.text}
        </span>
      )}

      {/* Delete button */}
      {!editing && (
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="삭제"
          className={`flex-shrink-0 text-gray-300 hover:text-red-400 transition-all duration-150 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </li>
  )
}
