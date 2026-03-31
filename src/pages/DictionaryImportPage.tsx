import { Button, Card, Checkbox, Input, List, Space, Statistic, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { importDictionaryWords } from '../api/shinmeikaieasy'
import ErrorBanner from '../components/ErrorBanner'
import { mapDictionaryImportResult } from '../types/mappers'
import type { DictionaryImportResult } from '../types/shinmeikaieasy'

const MAX_WORDS = 100

const splitWords = (value: string) =>
  value
    .split(/[\n,\t，、]+/g)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

export default function DictionaryImportPage() {
  const [input, setInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DictionaryImportResult | null>(null)
  const [createTasks, setCreateTasks] = useState(true)

  const words = useMemo(() => splitWords(input), [input])
  const overLimit = words.length > MAX_WORDS

  const handleSubmit = async () => {
    if (words.length === 0 || overLimit) {
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const response = await importDictionaryWords(words, createTasks)
      setResult(mapDictionaryImportResult(response))
    } catch (err) {
      setError('导入失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card size="small" className="duo-card">
        <Typography.Title level={4} className="duo-title">
          导入词汇
        </Typography.Title>
        <Typography.Paragraph className="duo-subtitle">
          支持换行、逗号、顿号、制表符分隔，最多 {MAX_WORDS} 个。
        </Typography.Paragraph>
        {error && <ErrorBanner message={error} />}
        {overLimit && <ErrorBanner message={`已超过限制：${words.length}/${MAX_WORDS}`} />}
        <Input.TextArea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={6}
          placeholder="请输入日语词汇"
        />
        <Space style={{ marginTop: 16 }} wrap>
          <Checkbox checked={createTasks} onChange={(event) => setCreateTasks(event.target.checked)}>
            字典不存在时创建任务
          </Checkbox>
          <Button
            type="primary"
            className="duo-button"
            loading={submitting}
            disabled={words.length === 0 || overLimit}
            onClick={handleSubmit}
          >
            开始导入
          </Button>
        </Space>
      </Card>

      {result && (
        <Card size="small" className="duo-card">
          <Space size="large">
            <Statistic title="总数" value={result.total} />
            <Statistic title="字典已存在" value={result.existsInDictionary} />
            <Statistic title="创建任务" value={result.tasksCreated} />
            <Statistic title="已跳过" value={result.skipped} />
          </Space>
        </Card>
      )}

      {result && result.errors.length > 0 && (
        <Card size="small" className="duo-card">
          <Typography.Title level={5}>错误列表</Typography.Title>
          <List
            className="duo-list"
            dataSource={result.errors}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text>{item.word}</Typography.Text>
                <Typography.Text type="secondary" style={{ marginLeft: 12 }}>
                  {item.code} {item.message}
                </Typography.Text>
              </List.Item>
            )}
          />
        </Card>
      )}
    </Space>
  )
}
