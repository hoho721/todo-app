import { useState, KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
  onToggleAll: () => void
  hasItems: boolean
  allCompleted: boolean
}

export default function TodoInput({ onAdd, onToggleAll, hasItems, allCompleted }: Props) {
  const [value, setValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(value)
      setValue('')
    }
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
      {hasItems && (
        <button
          onClick={onToggleAll}
          title="모두 완료/미완료"
          className={`flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded ${
            allCompleted ? 'text-indigo-500' : ''
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      {!hasItems && <div className="w-7" />}
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하고 Enter를 누르세요"
        className="flex-1 text-base text-gray-700 placeholder-gray-300 bg-transparent outline-none"
        autoFocus
      />
    </div>
  )
}
