import PostCard from '~/components/Card/Post'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PostCard> = {
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    showDescription: {
      control: 'boolean',
      defaultValue: true,
    },
  },
}

export default meta

type Story = StoryObj<typeof PostCard>

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
      createdAt: new Date(),
      updatedAt: new Date(),
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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
}
