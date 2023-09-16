import Card from '~/components/Card'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
    showDescription: {
      description: '説明を表示するかどうか',
      control: 'boolean',
      table: {
        category: 'Content',
      },
    },
    title: {
      description: 'タイトル',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    description: {
      description: '説明',
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    image: {
      description: '画像',
      control: 'text',
      table: {
        category: 'Image',
      },
    },
    imageTitle: {
      description: '画像のタイトル',
      control: 'text',
      table: {
        category: 'Image',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Defaults: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    image: 'https://source.unsplash.com/random',
    imageTitle: 'Image Title',
  },
}

export const DescriptionOff: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    image: 'https://source.unsplash.com/random',
    imageTitle: 'Image Title',
    showDescription: false,
  },
}
