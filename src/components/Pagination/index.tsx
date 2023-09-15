import { Pagination as MuiPagination } from '@mui/material'
import React, { ChangeEvent, ComponentPropsWithoutRef } from 'react'
import { twMerge } from 'tailwind-merge'

type MuiPaginationType = ComponentPropsWithoutRef<typeof MuiPagination>

export type PaginationProps = {
  page: number
  totalPage: number
  className?: string
  color?: MuiPaginationType['color']
  showFirstButton?: boolean
  showLastButton?: boolean
  onChange: (value: number) => void
}

/**
 * ページネーション
 * @param page 現在のページ
 * @param totalPage ページの合計
 * @param className クラス
 * @param color MUI PaginationのColor
 * @param showFirstButton 最初まで戻るボタン
 * @param showLastButton 最後まで移動するボタン
 * @param onChange MUI Paginationのカスタム, 移動後のページを返す
 */
const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPage,
  className,
  color = 'primary',
  showFirstButton = true,
  showLastButton = true,
  onChange,
}) => {
  const allClasses = twMerge('', className)

  const onChangePagination = (_: ChangeEvent<unknown>, value: number) =>
    onChange(value)

  return (
    <MuiPagination
      className={allClasses}
      color={color}
      count={totalPage}
      onChange={onChangePagination}
      page={page ?? 1}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
    />
  )
}

export default Pagination
