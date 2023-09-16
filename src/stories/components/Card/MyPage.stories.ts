import MyPostCard from '~/components/Card/MyPage'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MyPostCard> = {
  component: MyPostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'CSS',
      },
    },
    showDescription: {
      control: 'boolean',
      defaultValue: true,
      table: {
        category: 'PostCard',
      },
    },
    post: {
      description: 'Postの情報',
      control: 'object',
      table: {
        category: 'PostCard',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof MyPostCard>

export const Defaults: Story = {
  args: {
    showDescription: true,
    post: {
      id: '',
      name: 'Material UI for Figma (and MUI X)',
      description:
        'Figma Community file - This is a community version of Material UI for Figma, a UI kit with handcrafted components for Figma.',
      image:
        'https://s3-alpha.figma.com/hub/file/3913238047/3e09af18-aa0e-4708-98cc-fe40bacd4a51-cover.png',
      url: 'https://www.figma.com/community/file/912837788133317724/Material-UI-for-Figma-(and-MUI-X)',
      userId: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
}

export const DescriptionOff: Story = {
  args: {
    showDescription: false,
    post: {
      id: '',
      name: 'Material UI for Figma (and MUI X)',
      description:
        'Figma Community file - This is a community version of Material UI for Figma, a UI kit with handcrafted components for Figma.',
      image:
        'https://s3-alpha.figma.com/hub/file/3913238047/3e09af18-aa0e-4708-98cc-fe40bacd4a51-cover.png',
      url: 'https://www.figma.com/community/file/912837788133317724/Material-UI-for-Figma-(and-MUI-X)',
      userId: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  },
}
