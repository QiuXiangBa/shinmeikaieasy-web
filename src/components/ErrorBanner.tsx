import { Alert } from 'antd'

export interface ErrorBannerProps {
  message: string
  description?: string
  closable?: boolean
}

export default function ErrorBanner({ message, description, closable }: ErrorBannerProps) {
  return (
    <Alert
      type="error"
      showIcon
      message={message}
      description={description}
      closable={closable}
    />
  )
}
