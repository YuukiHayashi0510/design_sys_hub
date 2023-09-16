import {
  CardActions,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Typography,
} from '@mui/material'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type CardProps = {
  className?: string
  image?: string
  imageTitle?: string
  title: string
  description?: string
  showDescription?: boolean
}

/**
 * カード
 * @param className カードのクラス
 * @param image 画像
 * @param imageTitle 画像のタイトル
 * @param title タイトル
 * @param description 説明
 * @param showDescription 説明を表示するかどうか
 * @param children 子要素
 */
const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  className,
  image,
  imageTitle,
  title,
  description,
  showDescription = true,
  children,
}) => {
  const allClasses = twMerge('relative w-[400px]', className)

  return (
    <MuiCard className={allClasses}>
      <div className='relative'>
        <CardMedia className='aspect-image' image={image} title={imageTitle} />
      </div>
      <CardContent>
        <Typography
          className={showDescription ? 'max-h-[38px] overflow-hidden' : ''}
          component='div'
          gutterBottom
          variant='h6'
        >
          {title}
        </Typography>
        {showDescription && (
          <Typography
            className='max-h-[83px] overflow-hidden'
            color='text.secondary'
            variant='body2'
          >
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions className={showDescription ? 'absolute bottom-0' : ''}>
        {children}
      </CardActions>
    </MuiCard>
  )
}

export default Card
