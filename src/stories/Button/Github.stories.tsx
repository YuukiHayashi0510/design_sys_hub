import GithubButton from '../../components/Button/Github'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof GithubButton> = {
  component: GithubButton,
}

export default meta

type Story = StoryObj<typeof GithubButton>

export const Default: Story = {
  args: { className: '' },
}
