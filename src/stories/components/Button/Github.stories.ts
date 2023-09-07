import GithubButton from '~/components/Button/Github'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GithubButton> = {
  component: GithubButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    onClick: {
      action: 'clicked',
    },
  },
}

export default meta

type Story = StoryObj<typeof GithubButton>

export const Defaults: Story = {
  args: {
    className: '',
  },
}
