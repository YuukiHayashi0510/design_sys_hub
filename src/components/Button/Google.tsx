import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import { twMerge } from 'tailwind-merge'

export type StyledGoogleButtonProps = ComponentPropsWithoutRef<
  typeof GoogleButton
>

function StyledGoogleButton({
  className,
  type: theme,
  onClick,
}: StyledGoogleButtonProps) {
  const allClasses = twMerge('mr-0', className)
  const [type, setType] = useState<StyledGoogleButtonProps['type']>(
    theme ?? 'light',
  )

  // DOMが組まれる段階ではwindow undefinedエラーが出るため
  // ハイドレーション中に動作するuseEffectを使っている
  // 動的な変更（時間帯による変化、OSのテーマ変更）は検知できない
  useEffect(() => {
    if (theme) return

    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    setType(mode)
  }, [theme])

  return <GoogleButton className={allClasses} onClick={onClick} type={type} />
}

export default StyledGoogleButton
