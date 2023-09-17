import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type SearchFormProps = {
  className?: string
  label?: string
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

/**
 * 検索フォーム
 * @param className クラス名
 * @param label ラベル
 * @param value 値
 * @param onChange 値変更時のハンドラ
 * @param onSubmit 送信時のハンドラ
 */
const SearchForm: React.FC<SearchFormProps> = ({
  className,
  label,
  value,
  onChange,
  onSubmit,
}) => {
  const allClasses = twMerge('w-full', className)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className={allClasses} onSubmit={handleSubmit}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className='w-full'
        label={label}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </form>
  )
}

export default SearchForm
