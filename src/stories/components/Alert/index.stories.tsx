import Alert from '~/components/Alert'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Alert> = {
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    type: {
      description: 'アラートの種類',
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Alert>

export const Defaults: Story = {
  args: {
    className: '',
    children: 'アラート',
  },
}

export const Info: Story = {
  args: {
    className: '',
    children: 'アラート',
    type: 'info',
  },
}

export const Success: Story = {
  args: {
    className: '',
    children: 'アラート',
    type: 'success',
  },
}

export const Warning: Story = {
  args: {
    className: '',
    children: 'アラート',
    type: 'warning',
  },
}

export const Error: Story = {
  args: {
    className: '',
    children: 'アラート',
    type: 'error',
  },
}
