import React, { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

type ToggleButtonProps = {
  label: string
  className?: string
  checked: boolean
  disabled?: boolean
  setChecked: Dispatch<SetStateAction<boolean>>
}

const ToggleButton = ({
  label,
  className,
  checked,
  disabled,
  setChecked,
}: ToggleButtonProps) => {
  const allClasses = twMerge(
    'relative inline-flex cursor-pointer items-center',
    className,
  )

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setChecked(e.target.checked)

  return (
    <label className={allClasses}>
      <input
        checked={checked}
        className='peer sr-only'
        disabled={disabled}
        onChange={onChange}
        type='checkbox'
        value=''
      />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      <span className='ml-3 text-sm font-medium text-black dark:text-gray-300'>
        {label}
      </span>
    </label>
  )
}

export default ToggleButton
