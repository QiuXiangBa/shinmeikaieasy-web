export interface ApiResponse<T> {
  code?: number | string
  message?: string
  msg?: string
  data?: T
}

export interface ApiError {
  code: string
  message: string
}

export interface ApiEntry {
  headword: string
  reading?: string
  glossJa?: string
  glossZh?: string
  sourceEdition?: string | null
  sourcePage?: number | null
  sourceImageId?: string | null
}

export interface ApiDecomposition {
  seq?: number
  glyph?: string
  glyphType?: string
  glyphReading?: string
  glyphGlossJa?: string
  glyphGlossZh?: string
  confidence?: number
}

export interface ApiLearningNote {
  ja?: string
  zh?: string
}

export interface ApiUseCase {
  ja?: string
  kana?: string
  zh?: string
}

export interface ApiWordAnalyzeResult {
  ok: boolean
  input: string
  source?: string
  entry?: ApiEntry | null
  decomposition?: ApiDecomposition[]
  learning_notes?: ApiLearningNote[]
  use_cases?: ApiUseCase[]
  warnings?: string[]
  error?: ApiError | null
}

export interface ApiWordAnalyzeBatchResult {
  results: ApiWordAnalyzeResult[]
}

export interface ApiDictionaryEntry {
  headword: string
  reading?: string
  glossJa?: string
  glossZh?: string
  decomposition?: ApiDecomposition[]
  learning_notes?: ApiLearningNote[]
  use_cases?: ApiUseCase[]
}

export interface ApiImportError {
  word: string
  code: string
  message: string
}

export interface ApiDictionaryImportResult {
  total: number
  existsInDictionary: number
  tasksCreated: number
  skipped: number
  errors: ApiImportError[]
}

export interface ApiPagination {
  total: number
  page: number
  size: number
  totalPages?: number
}

export interface ApiTaskItem {
  id: number
  headword: string
  status: string
  attemptCount?: number
  lastErrorCode?: string
  lastErrorMessage?: string
  dictionaryEntryId?: number
  createdAt?: string
  updatedAt?: string
}

export interface ApiTaskList {
  list: ApiTaskItem[]
  pagination: ApiPagination
}

export interface ApiTaskRunResult {
  executed: number
  succeeded: number
  failed: number
  taskIds: number[]
}

export interface ApiMeWordItem {
  headword: string
  status: string
  createdAt?: string
  dictionaryEntry?: ApiDictionaryEntry | null
}

export interface ApiMeWordList {
  list: ApiMeWordItem[]
  pagination: ApiPagination
}

export interface Entry {
  headword: string
  reading?: string
  glossJa?: string
  glossZh?: string
  sourceEdition?: string | null
  sourcePage?: number | null
  sourceImageId?: string | null
}

export interface Decomposition {
  seq?: number
  glyph?: string
  glyphType?: string
  glyphReading?: string
  glyphGlossJa?: string
  glyphGlossZh?: string
  confidence?: number
}

export interface LearningNote {
  ja?: string
  zh?: string
}

export interface UseCase {
  ja?: string
  kana?: string
  zh?: string
}

export interface WordAnalyzeResult {
  ok: boolean
  input: string
  source?: string
  entry?: Entry | null
  decomposition: Decomposition[]
  learningNotes: LearningNote[]
  useCases: UseCase[]
  warnings: string[]
  error?: ApiError | null
}

export interface WordAnalyzeBatchResult {
  results: WordAnalyzeResult[]
}

export interface DictionaryEntry {
  headword: string
  reading?: string
  glossJa?: string
  glossZh?: string
  decomposition: Decomposition[]
  learningNotes: LearningNote[]
  useCases: UseCase[]
}

export interface ImportError {
  word: string
  code: string
  message: string
}

export interface DictionaryImportResult {
  total: number
  existsInDictionary: number
  tasksCreated: number
  skipped: number
  errors: ImportError[]
}

export interface Pagination {
  total: number
  page: number
  size: number
  totalPages?: number
}

export interface TaskItem {
  id: number
  headword: string
  status: string
  attemptCount?: number
  lastErrorCode?: string
  lastErrorMessage?: string
  dictionaryEntryId?: number
  createdAt?: string
  updatedAt?: string
}

export interface TaskList {
  list: TaskItem[]
  pagination: Pagination
}

export interface TaskRunResult {
  executed: number
  succeeded: number
  failed: number
  taskIds: number[]
}

export interface MeWordItem {
  headword: string
  status: string
  createdAt?: string
  dictionaryEntry?: DictionaryEntry | null
}

export interface MeWordList {
  list: MeWordItem[]
  pagination: Pagination
}
