import { Button, message } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import type { ButtonProps } from 'antd'

export interface CopyButtonProps extends ButtonProps {
  text: string
  successText?: string
  errorText?: string
}

const DEFAULT_SUCCESS_TEXT = '已复制'
const DEFAULT_ERROR_TEXT = '复制失败'

export default function CopyButton({
  text,
  successText = DEFAULT_SUCCESS_TEXT,
  errorText = DEFAULT_ERROR_TEXT,
  ...buttonProps
}: CopyButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      message.success(successText)
    } catch (error) {
      message.error(errorText)
    }
  }

  return (
    <Button icon={<CopyOutlined />} onClick={handleCopy} {...buttonProps}>
      {buttonProps.children ?? '复制'}
    </Button>
  )
}
