import React from 'react'
import { twMerge } from 'tailwind-merge'

export type ImageProps = {
  className?: string
  src?: string
  alt?: string
}

const Image: React.FC<ImageProps> = ({ className, alt, src }) => {
  const allClasses = twMerge('p-10', className)

  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} className={allClasses} src={src} />
}

export default Image
