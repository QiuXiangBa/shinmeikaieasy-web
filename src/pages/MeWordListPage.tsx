import { Card, List, Segmented, Space, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listMeWords } from '../api/shinmeikaieasy'
import PaginationBar from '../components/Pagination'
import { mapMeWordList } from '../types/mappers'
import type { MeWordItem, Pagination } from '../types/shinmeikaieasy'

const DEFAULT_PAGINATION: Pagination = { page: 1, size: 20, total: 0, totalPages: 0 }

export default function MeWordListPage() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<'list' | 'group'>('list')
  const [data, setData] = useState<MeWordItem[]>([])
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)
  const [loading, setLoading] = useState(false)

  const getCharReading = (item: MeWordItem, char: string) => {
    const matched = item.dictionaryEntry?.decomposition?.find((part) => part.glyph === char)
    return matched?.glyphReading || '--'
  }

  const fetchList = async (page = pagination.page, size = pagination.size) => {
    setLoading(true)
    try {
      const response = await listMeWords(undefined, page, size)
      const mapped = mapMeWordList(response)
      setData(mapped.list)
      setPagination(mapped.pagination)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList(1, pagination.size)
  }, [])

  const handlePageChange = (page: number, size: number) => {
    void fetchList(page, size)
  }

  const groupedData = useMemo(() => {
    const grouped = data.reduce<Record<string, MeWordItem[]>>((acc, item) => {
      const glyphs =
        item.dictionaryEntry?.decomposition?.map((part) => part.glyph).filter(Boolean) ?? []
      const uniqueChars = glyphs.length > 0 ? Array.from(new Set(glyphs)) : ['#']
      uniqueChars.forEach((char) => {
        const key = char ?? '#'
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item)
      })
      return acc
    }, {})
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  }, [data])

  return (
    <div className="me-page">
      <Card size="small" className="duo-card me-header">

        <Segmented
          value={viewMode}
          onChange={(value) => setViewMode(value as 'list' | 'group')}
          options={[
            { label: '列表', value: 'list' },
            { label: '按字分组', value: 'group' },
          ]}
          block
          size="large"
        />
      </Card>

      <Card size="small" className="duo-card me-list-card">
        <div className="me-list-scroll">
          {viewMode === 'list' ? (
            <List
              className="duo-list"
              loading={loading}
              dataSource={data}
              renderItem={(record) => (
                <List.Item className={record.dictionaryEntry ? 'word-clickable' : 'word-disabled'}>
                  <div
                    className={`word-row ${record.dictionaryEntry ? 'word-clickable' : 'word-disabled'}`}
                    role={record.dictionaryEntry ? 'button' : undefined}
                    tabIndex={record.dictionaryEntry ? 0 : -1}
                    onClick={() => {
                      if (record.dictionaryEntry) {
                        navigate(`/detail/${record.headword}`)
                      }
                    }}
                  >
                    <div className="word-main">
                      <Typography.Text strong>{record.headword}</Typography.Text>
                      <Typography.Text type="secondary">
                        reading：{record.dictionaryEntry?.reading || '--'}
                      </Typography.Text>
                      <Typography.Text type="secondary">状态：{record.status}</Typography.Text>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {groupedData.map(([groupKey, items]) => (
                <Card
                  key={groupKey}
                  size="small"
                  title={
                    <div className="group-header">
                      <div className="group-char">{groupKey}</div>
                      <div className="group-count">{items.length} 个词</div>
                    </div>
                  }
                >
                  <List
                    className="duo-list"
                    loading={loading}
                    dataSource={items}
                    renderItem={(record) => (
                      <List.Item className={record.dictionaryEntry ? 'word-clickable' : 'word-disabled'}>
                        <div
                          className={`word-row ${record.dictionaryEntry ? 'word-clickable' : 'word-disabled'}`}
                          role={record.dictionaryEntry ? 'button' : undefined}
                          tabIndex={record.dictionaryEntry ? 0 : -1}
                          onClick={() => {
                            if (record.dictionaryEntry) {
                              navigate(`/detail/${record.headword}`)
                            }
                          }}
                        >
                          <div className="word-main">
                            <Typography.Text strong>{record.headword}</Typography.Text>
                            <Typography.Text type="secondary">
                              reading：{record.dictionaryEntry?.reading || '--'}
                            </Typography.Text>
                            <Typography.Text type="secondary">
                              {groupKey}：{getCharReading(record, groupKey)}
                            </Typography.Text>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              ))}
            </Space>
          )}
        </div>

        <div className="me-pagination">
          <PaginationBar
            pagination={pagination}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </Card>
    </div>
  )
}
