import { Meta, StoryObj } from '@storybook/react'
import StyledGoogleButton from '.'

const meta: Meta<typeof StyledGoogleButton> = {
  component: StyledGoogleButton,
}

export default meta

type Story = StoryObj<typeof StyledGoogleButton>

export const Default: Story = {}

export const Light: Story = {
  args: { theme: 'light' },
}

export const Dark: Story = {
  args: { theme: 'dark' },
}
