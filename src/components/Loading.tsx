import { Spin } from 'antd'
import type { ReactNode } from 'react'

export interface LoadingProps {
  loading: boolean
  fullscreen?: boolean
  tip?: string
  children?: ReactNode
}

export default function Loading({ loading, fullscreen, tip, children }: LoadingProps) {
  if (fullscreen) {
    return <Spin spinning={loading} tip={tip} fullscreen />
  }

  return (
    <Spin spinning={loading} tip={tip}>
      {children}
    </Spin>
  )
}
