import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'

export default function App() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos()

  const allCompleted = todos.length > 0 && todos.every(t => t.completed)

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Todo</h1>
        </div>
        <p className="text-sm text-gray-400">할 일을 정리하고 집중하세요</p>
      </header>

      {/* Card */}
      <main className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 overflow-hidden border border-gray-100">
          <TodoInput
            onAdd={addTodo}
            onToggleAll={toggleAll}
            hasItems={todos.length > 0}
            allCompleted={allCompleted}
          />

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            filter={filter}
          />

          {todos.length > 0 && (
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>

        <p className="text-center text-xs text-gray-300 mt-4">
          더블클릭으로 편집 · Enter로 저장 · Esc로 취소
        </p>
      </main>
    </div>
  )
}
