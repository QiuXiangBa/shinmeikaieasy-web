import apiClient from './apiClient'
import type {
  ApiDictionaryImportResult,
  ApiMeWordList,
  ApiResponse,
  ApiTaskList,
  ApiTaskRunResult,
  ApiWordAnalyzeBatchResult,
  ApiWordAnalyzeResult,
} from '../types/shinmeikaieasy'

const unwrap = <T>(response: { data: ApiResponse<T> | T }): T => {
  const payload = response.data as ApiResponse<T>
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload.data ?? null) as T
  }
  return response.data as T
}

export const analyzeBatch = async (texts: string[]): Promise<ApiWordAnalyzeBatchResult> => {
  const response = await apiClient.post<ApiResponse<ApiWordAnalyzeBatchResult>>('/words/analyze/batch', {
    texts,
  })
  return unwrap(response)
}

export const analyzeSingle = async (text: string): Promise<ApiWordAnalyzeResult> => {
  const response = await apiClient.post<ApiResponse<ApiWordAnalyzeResult>>('/words/analyze', { text })
  return unwrap(response)
}

export const getDictionaryEntry = async (headword: string): Promise<ApiWordAnalyzeResult> => {
  const response = await apiClient.get<ApiResponse<ApiWordAnalyzeResult>>('/dictionary/entries', {
    params: { headword },
  })
  return unwrap(response)
}

export const importDictionaryWords = async (
  words: string[],
  createTasksIfMissing: boolean,
): Promise<ApiDictionaryImportResult> => {
  const response = await apiClient.post<ApiResponse<ApiDictionaryImportResult>>('/dictionary/import', {
    words,
    createTasksIfMissing,
  })
  return unwrap(response)
}

export const listTasks = async (
  status: string | undefined,
  page: number,
  size: number,
): Promise<ApiTaskList> => {
  const response = await apiClient.get<ApiResponse<ApiTaskList>>('/tasks/decompose', {
    params: {
      status: status || undefined,
      page,
      size,
    },
  })
  return unwrap(response)
}

export const runTasks = async (limit: number): Promise<ApiTaskRunResult> => {
  const response = await apiClient.post<ApiResponse<ApiTaskRunResult>>('/tasks/decompose/run', {
    limit,
  })
  return unwrap(response)
}

export const listMeWords = async (
  status: string | undefined,
  page: number,
  size: number,
): Promise<ApiMeWordList> => {
  const response = await apiClient.get<ApiResponse<ApiMeWordList>>('/me/words', {
    params: {
      status: status || undefined,
      page,
      size,
    },
  })
  return unwrap(response)
}
