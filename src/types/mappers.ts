import type {
  ApiDictionaryEntry,
  ApiDictionaryImportResult,
  ApiEntry,
  ApiMeWordItem,
  ApiMeWordList,
  ApiPagination,
  ApiTaskItem,
  ApiTaskList,
  ApiTaskRunResult,
  ApiWordAnalyzeBatchResult,
  ApiWordAnalyzeResult,
  Decomposition,
  DictionaryEntry,
  DictionaryImportResult,
  Entry,
  MeWordItem,
  MeWordList,
  Pagination,
  TaskItem,
  TaskList,
  TaskRunResult,
  WordAnalyzeBatchResult,
  WordAnalyzeResult,
} from './shinmeikaieasy'

const toEntry = (entry?: ApiEntry | null): Entry | null => {
  if (!entry) {
    return null
  }
  return {
    headword: entry.headword,
    reading: entry.reading,
    glossJa: entry.glossJa,
    glossZh: entry.glossZh,
    sourceEdition: entry.sourceEdition ?? null,
    sourcePage: entry.sourcePage ?? null,
    sourceImageId: entry.sourceImageId ?? null,
  }
}

const toDecomposition = (item: NonNullable<ApiWordAnalyzeResult['decomposition']>[number]): Decomposition => ({
  seq: item.seq,
  glyph: item.glyph,
  glyphType: item.glyphType,
  glyphReading: item.glyphReading,
  glyphGlossJa: item.glyphGlossJa,
  glyphGlossZh: item.glyphGlossZh,
  confidence: item.confidence,
})

export const mapWordAnalyzeResult = (result: ApiWordAnalyzeResult): WordAnalyzeResult => ({
  ok: result.ok,
  input: result.input,
  source: result.source,
  entry: toEntry(result.entry ?? null),
  decomposition: (result.decomposition ?? []).map(toDecomposition),
  learningNotes: result.learning_notes ?? [],
  useCases: result.use_cases ?? [],
  warnings: result.warnings ?? [],
  error: result.error ?? null,
})

export const mapWordAnalyzeBatchResult = (result: ApiWordAnalyzeBatchResult): WordAnalyzeBatchResult => ({
  results: (result.results ?? []).map(mapWordAnalyzeResult),
})

export const mapDictionaryEntry = (entry?: ApiDictionaryEntry | null): DictionaryEntry | null => {
  if (!entry) {
    return null
  }
  return {
    headword: entry.headword,
    reading: entry.reading,
    glossJa: entry.glossJa,
    glossZh: entry.glossZh,
    decomposition: (entry.decomposition ?? []).map(toDecomposition),
    learningNotes: entry.learning_notes ?? [],
    useCases: entry.use_cases ?? [],
  }
}

export const mapDictionaryImportResult = (
  result: ApiDictionaryImportResult,
): DictionaryImportResult => ({
  total: result.total ?? 0,
  existsInDictionary: result.existsInDictionary ?? 0,
  tasksCreated: result.tasksCreated ?? 0,
  skipped: result.skipped ?? 0,
  errors: result.errors ?? [],
})

export const mapPagination = (pagination?: ApiPagination | null): Pagination => ({
  total: pagination?.total ?? 0,
  page: pagination?.page ?? 1,
  size: pagination?.size ?? 20,
  totalPages: pagination?.totalPages ?? 0,
})

export const mapTaskItem = (item: ApiTaskItem): TaskItem => ({
  id: item.id,
  headword: item.headword,
  status: item.status,
  attemptCount: item.attemptCount,
  lastErrorCode: item.lastErrorCode,
  lastErrorMessage: item.lastErrorMessage,
  dictionaryEntryId: item.dictionaryEntryId,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
})

export const mapTaskList = (result: ApiTaskList): TaskList => ({
  list: (result.list ?? []).map(mapTaskItem),
  pagination: mapPagination(result.pagination),
})

export const mapTaskRunResult = (result: ApiTaskRunResult): TaskRunResult => ({
  executed: result.executed ?? 0,
  succeeded: result.succeeded ?? 0,
  failed: result.failed ?? 0,
  taskIds: result.taskIds ?? [],
})

const mapMeWordItem = (item: ApiMeWordItem): MeWordItem => ({
  headword: item.headword,
  status: item.status,
  createdAt: item.createdAt,
  dictionaryEntry: mapDictionaryEntry(item.dictionaryEntry ?? null),
})

export const mapMeWordList = (result: ApiMeWordList): MeWordList => ({
  list: (result.list ?? []).map(mapMeWordItem),
  pagination: mapPagination(result.pagination),
})
