import { FilterType } from '../types'

interface Props {
  filter: FilterType
  onFilterChange: (f: FilterType) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '미완료' },
  { key: 'completed', label: '완료' },
]

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-400 border-t border-gray-100">
      <span className="w-24">
        {activeCount > 0
          ? `${activeCount}개 남음`
          : '모두 완료!'}
      </span>

      <div className="flex gap-1">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
              filter === key
                ? 'bg-indigo-100 text-indigo-600'
                : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="w-24 text-right text-xs hover:text-red-400 transition-colors disabled:opacity-0 disabled:cursor-default"
      >
        완료 삭제
      </button>
    </div>
  )
}
