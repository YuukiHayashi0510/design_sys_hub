import Header from '~/components/Layout/Header'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      description: 'NextAuthのUser型',
      control: 'object',
    },
    onClickSignOut: {
      description: 'SignOut関数',
    },
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Defaults: Story = {}

export const LoginUser: Story = {
  args: {
    user: {
      id: '',
    },
  },
}
