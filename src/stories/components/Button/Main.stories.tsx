import Button from '~/components/Button/Main'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Defaults: Story = {
  args: {
    className: '',
    children: 'ボタン',
  },
}

export const Disabled: Story = {
  args: {
    className: '',
    children: 'ボタン',
    disabled: true,
  },
}

export const TextButton: Story = {
  args: {
    className: '',
    children: 'ボタン',
    variant: 'text',
  },
}

export const OutlinedButton: Story = {
  args: {
    className: '',
    children: 'ボタン',
    variant: 'outlined',
  },
}

export const ContainedButton: Story = {
  args: {
    className: '',
    children: 'ボタン',
    variant: 'contained',
  },
}

export const SmallButton: Story = {
  args: {
    className: '',
    children: 'ボタン',
    variant: 'contained',
    size: 'small',
  },
}

export const MediumButton: Story = {
  args: {
    className: '',
    children: 'ボタン',
    variant: 'contained',
    size: 'medium',
  },
}

export const LargeButton: Story = {
  args: {
    className: '',
    children: 'ボタン',
    variant: 'contained',
    size: 'large',
  },
}
