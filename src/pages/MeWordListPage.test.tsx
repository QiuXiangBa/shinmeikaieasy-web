import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import MeWordListPage from './MeWordListPage'
import { listMeWords } from '../api/shinmeikaieasy'

vi.mock('../api/shinmeikaieasy', () => ({
  listMeWords: vi.fn(),
}))

const mockedListMeWords = vi.mocked(listMeWords)

describe('MeWordListPage', () => {
  afterEach(() => {
    mockedListMeWords.mockReset()
  })

  it('loads the next page when the user changes pagination', async () => {
    mockedListMeWords
      .mockResolvedValueOnce({
        list: [
          {
            headword: '第一页词',
            status: 'READY',
            dictionaryEntry: {
              headword: '第一页词',
              reading: 'だいいち',
              decomposition: [],
              learning_notes: [],
              use_cases: [],
            },
          },
        ],
        pagination: {
          total: 40,
          page: 1,
          size: 20,
          totalPages: 2,
        },
      })
      .mockResolvedValueOnce({
        list: [
          {
            headword: '第二页词',
            status: 'READY',
            dictionaryEntry: {
              headword: '第二页词',
              reading: 'だいに',
              decomposition: [],
              learning_notes: [],
              use_cases: [],
            },
          },
        ],
        pagination: {
          total: 40,
          page: 2,
          size: 20,
          totalPages: 2,
        },
      })

    render(
      <MemoryRouter>
        <MeWordListPage />
      </MemoryRouter>,
    )

    await screen.findByText('第一页词')

    fireEvent.click(await screen.findByTitle('2'))

    await waitFor(() => {
      expect(mockedListMeWords).toHaveBeenNthCalledWith(2, undefined, 2, 20)
    })

    expect(await screen.findByText('第二页词')).toBeInTheDocument()
  })
})
