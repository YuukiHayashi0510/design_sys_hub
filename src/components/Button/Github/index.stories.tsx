import type { Meta, StoryObj } from '@storybook/react'
import GithubButton from '.'

const meta: Meta<typeof GithubButton> = {
  component: GithubButton,
}

export default meta

type Story = StoryObj<typeof GithubButton>

export const Default: Story = {}
