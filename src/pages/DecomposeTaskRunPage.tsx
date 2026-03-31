import { Button, Card, InputNumber, Space, Statistic, Typography } from 'antd'
import { useState } from 'react'
import { runTasks } from '../api/shinmeikaieasy'
import ErrorBanner from '../components/ErrorBanner'
import { mapTaskRunResult } from '../types/mappers'
import type { TaskRunResult } from '../types/shinmeikaieasy'

const DEFAULT_LIMIT = 10

export default function DecomposeTaskRunPage() {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TaskRunResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRun = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await runTasks(limit)
      setResult(mapTaskRunResult(response))
    } catch (err) {
      setError('执行失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card size="small" className="duo-card">
        <Typography.Title level={4} className="duo-title">
          执行任务
        </Typography.Title>
        {error && <ErrorBanner message={error} />}
        <Space wrap>
          <Typography.Text>limit</Typography.Text>
          <InputNumber
            min={1}
            max={100}
            value={limit}
            onChange={(value) => setLimit(Number(value) || DEFAULT_LIMIT)}
          />
          <Button type="primary" className="duo-button" loading={loading} onClick={handleRun}>
            开始执行
          </Button>
        </Space>
      </Card>

      {result && (
        <Card size="small" className="duo-card">
          <Space size="large">
            <Statistic title="executed" value={result.executed} />
            <Statistic title="succeeded" value={result.succeeded} />
            <Statistic title="failed" value={result.failed} />
          </Space>
          <Typography.Paragraph style={{ marginTop: 16 }}>
            taskIds：{result.taskIds.join(', ') || '--'}
          </Typography.Paragraph>
        </Card>
      )}
    </Space>
  )
}
