import { Pagination as AntPagination } from 'antd'
import type { PaginationProps } from 'antd'
import type { Pagination } from '../types/shinmeikaieasy'

export interface PaginationBarProps {
  pagination: Pagination
  onChange: (page: number, size: number) => void
  showSizeChanger?: boolean
  pageSizeOptions?: PaginationProps['pageSizeOptions']
}

export default function PaginationBar({
  pagination,
  onChange,
  showSizeChanger = true,
  pageSizeOptions,
}: PaginationBarProps) {
  return (
    <AntPagination
      current={pagination.page}
      total={pagination.total}
      pageSize={pagination.size}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={pageSizeOptions}
      onChange={onChange}
      onShowSizeChange={onChange}
    />
  )
}
