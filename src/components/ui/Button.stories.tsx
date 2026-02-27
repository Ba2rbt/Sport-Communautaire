import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button, PrimaryButton, SecondaryButton } from './Button'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'live'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Stories – Button générique
// ---------------------------------------------------------------------------
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Voir le match',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Filtrer',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    children: 'En savoir plus',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'sm',
    children: 'Annuler',
  },
}

export const LiveBadge: Story = {
  args: {
    variant: 'live',
    size: 'sm',
    children: '● LIVE',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Chargement…',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Indisponible',
  },
}

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Petit' },
}

export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Grand' },
}

// ---------------------------------------------------------------------------
// Stories – variantes nommées
// ---------------------------------------------------------------------------
export const PrimaryVariant: StoryObj<typeof PrimaryButton> = {
  render: (args) => <PrimaryButton {...args} />,
  args: { children: 'Voter MVP' },
}

export const SecondaryVariant: StoryObj<typeof SecondaryButton> = {
  render: (args) => <SecondaryButton {...args} />,
  args: { children: 'Partager' },
}
