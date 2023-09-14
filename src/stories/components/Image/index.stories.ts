import { faker } from '@faker-js/faker'
import Image from '~/components/Image'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Image> = {
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    src: {
      description: '画像のSource',
      control: 'text',
    },
    alt: {
      description: '画像の内容を表すalt',
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Image>

export const Defaults: Story = {
  args: {
    className: '',
    src: faker.image.url(),
  },
}
