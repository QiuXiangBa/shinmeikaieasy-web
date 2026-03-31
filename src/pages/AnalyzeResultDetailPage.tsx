import { Card, Collapse, List, Space, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDictionaryEntry } from '../api/shinmeikaieasy'
import EmptyState from '../components/EmptyState'
import Loading from '../components/Loading'
import { mapWordAnalyzeResult } from '../types/mappers'
import type { Decomposition, WordAnalyzeResult } from '../types/shinmeikaieasy'
import { loadAnalyzeResults } from '../utils/analyzeStorage'

const renderValue = (value?: string | number | null) => (value ? String(value) : '--')

export default function AnalyzeResultDetailPage() {
  const { headword } = useParams<{ headword: string }>()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<WordAnalyzeResult | null>(null)

  const fromState = location.state as WordAnalyzeResult | undefined

  useEffect(() => {
    if (fromState) {
      setResult(fromState)
      return
    }
    const payload = loadAnalyzeResults()
    const cached = payload?.results.find((item) => item.entry?.headword === headword)
    if (cached) {
      setResult(cached)
      return
    }
    if (!headword) {
      return
    }
    const fetchEntry = async () => {
      setLoading(true)
      try {
        const response = await getDictionaryEntry(headword)
        setResult(mapWordAnalyzeResult(response))
      } finally {
        setLoading(false)
      }
    }
    fetchEntry()
  }, [fromState, headword])

  if (!result) {
    return (
      <Card size="small">
        <Loading loading={loading}>
          <EmptyState description="未找到详情数据" />
        </Loading>
      </Card>
    )
  }

  if (!result.ok || !result.entry) {
    return (
      <Card size="small">
        <Typography.Title level={4}>分析失败</Typography.Title>
        <Typography.Paragraph>
          {result.error?.code} {result.error?.message}
        </Typography.Paragraph>
      </Card>
    )
  }

  return (
    <div className="detail-page">
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Card className="duo-card">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={3} className="duo-title" style={{ marginBottom: 8 }}>
              {result.entry.headword}
            </Typography.Title>
            <Typography.Text type="secondary" className="duo-subtitle">
              读音：{renderValue(result.entry.reading)}
            </Typography.Text>
          </div>
          <div style={{ marginTop: 12 }}>
            <Typography.Text strong className="duo-subtitle">日文释义：</Typography.Text>
            <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
              {renderValue(result.entry.glossJa)}
            </Typography.Paragraph>
          </div>
          <div style={{ marginTop: 8 }}>
            <Typography.Text strong className="duo-subtitle">中文释义：</Typography.Text>
            <Typography.Paragraph style={{ marginTop: 4, marginBottom: 0 }}>
              {renderValue(result.entry.glossZh)}
            </Typography.Paragraph>
          </div>
        </Space>
      </Card>

      <Card className="duo-card">
        <Collapse
          defaultActiveKey={['decomposition', 'notes', 'cases']}
          items={[
            {
              key: 'decomposition',
              label: (
                <Typography.Text strong className="duo-subtitle">
                  拆分列表 ({result.decomposition.length})
                </Typography.Text>
              ),
              children: (
                <List
                  dataSource={result.decomposition}
                  locale={{ emptyText: '暂无内容' }}
                  renderItem={(item: Decomposition) => (
                    <Card
                      size="small"
                      style={{
                        marginBottom: 8,
                        border: '2px solid #e6f4d7',
                        borderRadius: 12,
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Tag color="#58cc02" style={{ margin: 0 }}>
                            #{item.seq}
                          </Tag>
                          <Typography.Text strong style={{ fontSize: 18 }}>
                            {item.glyph}
                          </Typography.Text>
                          <Tag color="blue" style={{ marginLeft: 'auto' }}>
                            {item.glyphType}
                          </Tag>
                        </div>
                        {item.glyphReading && (
                          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
                            读音：{item.glyphReading}
                          </Typography.Text>
                        )}
                        <div>
                          <Typography.Text type="secondary" style={{ fontSize: 13, display: 'block' }}>
                            {item.glyphGlossJa}
                          </Typography.Text>
                          <Typography.Text type="secondary" style={{ fontSize: 13, display: 'block', marginTop: 4 }}>
                            {item.glyphGlossZh}
                          </Typography.Text>
                        </div>
                      </Space>
                    </Card>
                  )}
                />
              ),
            },
            {
              key: 'notes',
              label: (
                <Typography.Text strong className="duo-subtitle">
                  学习提示 ({result.learningNotes.length})
                </Typography.Text>
              ),
              children: (
                <List
                  dataSource={result.learningNotes}
                  locale={{ emptyText: '暂无内容' }}
                  renderItem={(item) => (
                    <Card
                      size="small"
                      style={{
                        marginBottom: 8,
                        border: '2px solid #e6f4d7',
                        borderRadius: 12,
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Typography.Text>{renderValue(item.ja)}</Typography.Text>
                        <Typography.Text type="secondary">{renderValue(item.zh)}</Typography.Text>
                      </Space>
                    </Card>
                  )}
                />
              ),
            },
            {
              key: 'cases',
              label: (
                <Typography.Text strong className="duo-subtitle">
                  使用场景 ({result.useCases.length})
                </Typography.Text>
              ),
              children: (
                <List
                  dataSource={result.useCases}
                  locale={{ emptyText: '暂无内容' }}
                  renderItem={(item) => (
                    <Card
                      size="small"
                      style={{
                        marginBottom: 8,
                        border: '2px solid #e6f4d7',
                        borderRadius: 12,
                      }}
                    >
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Typography.Text>{renderValue(item.ja)}</Typography.Text>
                        {item.kana && (
                          <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                            {item.kana}
                          </Typography.Text>
                        )}
                        <Typography.Text type="secondary">{renderValue(item.zh)}</Typography.Text>
                      </Space>
                    </Card>
                  )}
                />
              ),
            },
          ]}
        />
      </Card>
      </Space>
    </div>
  )
}
