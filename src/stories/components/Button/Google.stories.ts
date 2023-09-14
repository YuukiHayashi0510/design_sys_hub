import StyledGoogleButton from '~/components/Button/Google'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof StyledGoogleButton> = {
  component: StyledGoogleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      description: 'ライトテーマ、ダークテーマ。デフォルトはブラウザ設定',
      control: 'select',
      options: ['light', 'dark'],
    },
    className: {
      control: 'text',
    },
    onClick: {
      action: 'clicked',
    },
  },
}

export default meta

type Story = StoryObj<typeof StyledGoogleButton>

export const Defaults: Story = {}

export const Light: Story = {
  args: { theme: 'light' },
}

export const Dark: Story = {
  args: { theme: 'dark' },
}
