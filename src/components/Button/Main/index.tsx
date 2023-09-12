import { Button as MuiButton } from '@mui/material'
import React, { ComponentPropsWithoutRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type MuiProps = ComponentPropsWithoutRef<typeof MuiButton>

export type ButtonProps = {
  className?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'text' | 'outlined' | 'contained'
  type?: MuiProps['type']
  disabled?: boolean
  children?: ReactNode
  onClick?: MuiProps['onClick']
}

const Button: React.FC<ButtonProps> = ({
  className,
  size,
  variant,
  type,
  disabled,
  onClick,
  children,
}) => {
  const allClasses = twMerge('normal-case', className)
  return (
    <MuiButton
      className={allClasses}
      disabled={disabled}
      onClick={onClick}
      size={size}
      type={type}
      variant={variant}
    >
      {children}
    </MuiButton>
  )
}

export default Button
