import type { Meta, StoryObj } from '@storybook/nextjs'
import CardEvent from './CardEvent'

const meta = {
  title: 'UI/CardEvent',
  component: CardEvent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardEvent>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------
export const Default: Story = {
  args: {
    image: '⚽',
    title: 'PSG vs Marseille – Le Classique',
    meta: 'Ligue 1 · Parc des Princes · 21h00',
    category: 'Football',
    date: '15 mars 2026',
    href: '/match/1',
  },
}

export const LiveMatch: Story = {
  args: {
    image: '🏀',
    title: 'Paris Basketball vs Monaco',
    meta: 'Pro A · Salle Pierre de Coubertin',
    category: 'Basket',
    isLive: true,
    href: '/match/2',
  },
}

export const MMAFight: Story = {
  args: {
    image: '🥊',
    title: 'Gane vs Volkov – Heavyweight',
    meta: 'UFC · Las Vegas · 03h00',
    category: 'MMA',
    date: '22 mars 2026',
    href: '/match/3',
  },
}

export const WithoutLink: Story = {
  args: {
    image: '🏉',
    title: 'Toulouse vs Bordeaux',
    meta: 'Top 14 · Stade Ernest-Wallon',
    category: 'Rugby',
    date: '1er avril 2026',
  },
}

export const NoDate: Story = {
  args: {
    image: '🎾',
    title: 'Federer vs Djokovic (archives)',
    meta: 'Roland-Garros · Court Philippe-Chatrier',
    category: 'Tennis',
  },
}
