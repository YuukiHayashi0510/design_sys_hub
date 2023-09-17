import SearchForm from '~/components/SearchForm'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SearchForm> = {
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    label: {
      description: 'フォームラベル、使わなくても良い',
      control: 'text',
    },
    value: {
      description: 'フォームの値',
      control: 'text',
    },
    onChange: {
      description: 'フォームの値が変更された時のイベント',
      action: 'onChange',
    },
    onSubmit: {
      description: 'フォームが送信された時のイベント',
      action: 'onSubmit',
    },
  },
}

export default meta

type Story = StoryObj<typeof SearchForm>

export const Defaults: Story = {}
