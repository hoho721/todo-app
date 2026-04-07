# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # 최초 설치
npm run dev       # 개발 서버 (http://localhost:5173)
npm run build     # 프로덕션 빌드 (tsc + vite build)
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint 검사
```

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS, localStorage 영속성

```
src/
├── types.ts              # Todo, FilterType 인터페이스
├── hooks/
│   └── useTodos.ts       # 모든 상태·로직 (추가/수정/삭제/필터/전체완료)
├── components/
│   ├── TodoInput.tsx     # 입력창 + 전체완료 토글 버튼
│   ├── TodoItem.tsx      # 개별 항목 (더블클릭 인라인 편집)
│   ├── TodoList.tsx      # 목록 렌더링 + 빈 상태 메시지
│   └── FilterBar.tsx     # 필터 탭 + 남은 개수 + 완료 일괄삭제
└── App.tsx               # useTodos 바인딩 + 레이아웃
```

**상태 흐름:** `useTodos` 훅이 단일 진실 원천. 모든 변경은 이 훅의 함수를 통하며, `useEffect`로 localStorage에 자동 동기화.

**편집 흐름:** TodoItem 내부에서만 `editing` 로컬 상태 관리. Enter/blur → 저장, Esc → 취소, 빈 텍스트 저장 → 삭제.
