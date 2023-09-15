import Pagination from '~/components/Pagination'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Style',
      },
    },
    page: {
      description: '現在のページ',
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
      table: {
        category: 'State',
      },
    },
    totalPage: {
      description: 'ページの合計、MUI Paginationのcount相当',
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
      table: {
        category: 'State',
      },
    },
    color: {
      description: 'MUI PaginationのColor',
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'standard'],
      },
      table: {
        category: 'Style',
      },
    },
    showFirstButton: {
      description: '最初まで戻るボタン',
      control: 'boolean',
      table: {
        category: 'Button',
      },
    },
    showLastButton: {
      description: '最後まで移動するボタン',
      control: 'boolean',
      table: {
        category: 'Button',
      },
    },
    onChange: {
      description: 'MUI Paginationのカスタム, 移動後のページを返す',
      action: 'changed',
    },
  },
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Defaults: Story = {
  args: {
    className: '',
  },
}

export const Primary: Story = {
  args: {
    className: '',
    color: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    className: '',
    color: 'secondary',
  },
}

export const Standard: Story = {
  args: {
    className: '',
    color: 'standard',
  },
}

export const TotalPageFive: Story = {
  args: {
    totalPage: 5,
  },
}

export const TotalPageTen: Story = {
  args: {
    totalPage: 10,
  },
}
