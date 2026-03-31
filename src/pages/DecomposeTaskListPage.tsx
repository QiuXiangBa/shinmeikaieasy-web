import { Card, List, Select, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { listTasks } from '../api/shinmeikaieasy'
import StatusTag from '../components/StatusTag'
import { mapTaskList } from '../types/mappers'
import type { Pagination, TaskItem } from '../types/shinmeikaieasy'

const STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: 'PENDING', label: '待处理' },
  { value: 'RUNNING', label: '处理中' },
  { value: 'DONE', label: '已完成' },
  { value: 'FAILED', label: '失败' },
]

const DEFAULT_PAGINATION: Pagination = { page: 1, size: 20, total: 0, totalPages: 0 }

export default function DecomposeTaskListPage() {
  const [status, setStatus] = useState<string>('')
  const [data, setData] = useState<TaskItem[]>([])
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION)
  const [loading, setLoading] = useState(false)

  const fetchList = async (page = pagination.page, size = pagination.size) => {
    setLoading(true)
    try {
      const response = await listTasks(status || undefined, page, size)
      const mapped = mapTaskList(response)
      setData(mapped.list)
      setPagination(mapped.pagination)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList(1, pagination.size)
  }, [status])

  return (
    <div className="task-page">
      <Card size="small" className="duo-card task-header">
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Typography.Text strong className="duo-subtitle" style={{ display: 'block' }}>
            状态筛选
          </Typography.Text>
          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            options={STATUS_OPTIONS}
            style={{ width: '100%' }}
            size="large"
          />
        </Space>
      </Card>

      <Card size="small" className="duo-card task-list-card">
        <div className="task-list-scroll">
          <List
            className="duo-list"
            loading={loading}
            dataSource={data}
            renderItem={(item: TaskItem) => (
              <Card
                size="small"
                style={{
                  marginBottom: 8,
                  border: '2px solid #e6f4d7',
                  borderRadius: 12,
                }}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      {item.headword}
                    </Typography.Text>
                    <StatusTag status={item.status} />
                  </div>
                  <div>
                    <Typography.Text type="secondary" style={{ fontSize: 13, display: 'block' }}>
                      ID：{item.id}
                    </Typography.Text>
                  {(item.attemptCount ?? 0) > 0 && (
                      <Typography.Text type="secondary" style={{ fontSize: 13, display: 'block' }}>
                        尝试次数：{item.attemptCount}
                      </Typography.Text>
                    )}
                    {item.lastErrorCode && (
                      <Typography.Text type="danger" style={{ fontSize: 13, display: 'block' }}>
                        错误码：{item.lastErrorCode}
                      </Typography.Text>
                    )}
                    {item.lastErrorMessage && (
                      <Typography.Text type="danger" style={{ fontSize: 13, display: 'block' }}>
                        错误信息：{item.lastErrorMessage}
                      </Typography.Text>
                    )}
                  </div>
                </Space>
              </Card>
            )}
          />
        </div>
      </Card>
    </div>
  )
}
