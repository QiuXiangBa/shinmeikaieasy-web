import { Modal } from 'antd'

export interface ConfirmModalProps {
  open: boolean
  title?: string
  content?: string
  okText?: string
  cancelText?: string
  confirmLoading?: boolean
  onOk: () => void
  onCancel: () => void
}

export default function ConfirmModal({
  open,
  title = '确认操作',
  content = '确定要继续吗？',
  okText = '确认',
  cancelText = '取消',
  confirmLoading,
  onOk,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      title={title}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      onOk={onOk}
      onCancel={onCancel}
    >
      {content}
    </Modal>
  )
}
