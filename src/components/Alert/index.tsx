import { Alert as MuiAlert } from '@mui/material'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type AlertProps = {
  className?: string
  type?: 'error' | 'info' | 'success' | 'warning'
}

/**
 * アラート
 * @param className クラス名
 * @param type アラートの種類
 * @param children 子要素
 */
const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  className,
  type = 'info',
  children,
}) => {
  const allClasses = twMerge('mt-20', className)
  return (
    <MuiAlert className={allClasses} severity={type}>
      {children}
    </MuiAlert>
  )
}

export default Alert
