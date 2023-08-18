import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import ToggleButton from '.'

const meta: Meta<typeof ToggleButton> = {
  component: ToggleButton,
}

export default meta

type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {
  args: {
    label: 'トグル',
  },
  render: function Comp({ ...args }) {
    const [checked, setChecked] = useState(false)

    return (
      <ToggleButton
        checked={checked}
        label={args.label}
        setChecked={setChecked}
      />
    )
  },
}

export const Disabled: Story = {
  args: { label: 'トグル', disabled: true },
}

export const DisabledChecked: Story = {
  args: { label: 'トグル', disabled: true, checked: true },
}
