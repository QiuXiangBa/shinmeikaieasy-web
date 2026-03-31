import { Tag } from 'antd'

export type TaskStatus = 'PENDING' | 'RUNNING' | 'DONE' | 'FAILED' | string

const STATUS_META: Record<string, { color: string; label: string }> = {
  PENDING: { color: 'default', label: '待处理' },
  RUNNING: { color: 'processing', label: '处理中' },
  DONE: { color: 'success', label: '已完成' },
  FAILED: { color: 'error', label: '失败' },
}

export interface StatusTagProps {
  status: TaskStatus
}

export default function StatusTag({ status }: StatusTagProps) {
  const meta = STATUS_META[status] ?? { color: 'warning', label: status || '未知' }
  return <Tag color={meta.color}>{meta.label}</Tag>
}
