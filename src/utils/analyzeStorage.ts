import type { WordAnalyzeResult } from '../types/shinmeikaieasy'

const STORAGE_KEY = 'shinmeikaieasy.analyzeResults'

export interface AnalyzeStoragePayload {
  input: string[]
  results: WordAnalyzeResult[]
  createdAt: number
}

export const saveAnalyzeResults = (payload: AnalyzeStoragePayload) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export const loadAnalyzeResults = (): AnalyzeStoragePayload | null => {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as AnalyzeStoragePayload
  } catch (error) {
    return null
  }
}
