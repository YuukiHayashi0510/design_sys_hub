import { Meta, StoryObj } from '@storybook/react'
import StyledGoogleButton from '../../components/Button/Google'

const meta: Meta<typeof StyledGoogleButton> = {
  component: StyledGoogleButton,
}

export default meta

type Story = StoryObj<typeof StyledGoogleButton>

export const Default: Story = {
  args: {
    className: '',
  },
}

export const Light: Story = {
  args: {
    className: '',
    type: 'light',
  },
}

export const Dark: Story = {
  args: {
    className: '',
    type: 'dark',
  },
}
