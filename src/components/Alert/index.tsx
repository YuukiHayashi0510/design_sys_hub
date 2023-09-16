import { Alert as MuiAlert } from '@mui/material'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type AlertProps = {
  className?: string
  type: 'error' | 'info' | 'success' | 'warning'
}

const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  className,
  type,
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
