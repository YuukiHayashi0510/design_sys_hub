import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type ImageProps = {
  className?: string
  src: string
  alt: string
}

const CustomImage: React.FC<ImageProps> = ({ className, alt, src }) => {
  const allClasses = twMerge('p-10', className)

  return (
    <Image
      alt={alt}
      className={allClasses}
      height={500}
      src={src}
      unoptimized
      width={500}
    />
  )
}

export { CustomImage as Image }
