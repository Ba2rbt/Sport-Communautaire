import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardEvent from '../CardEvent'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const defaultProps = {
  image: '⚽',
  title: 'PSG vs Marseille',
  meta: 'Ligue 1 · Parc des Princes',
}

// ---------------------------------------------------------------------------
// Rendu de base
// ---------------------------------------------------------------------------
describe('CardEvent – rendu', () => {
  it('affiche le titre', () => {
    render(<CardEvent {...defaultProps} />)
    expect(screen.getByText('PSG vs Marseille')).toBeInTheDocument()
  })

  it('affiche la ligne meta', () => {
    render(<CardEvent {...defaultProps} />)
    expect(screen.getByText(/ligue 1/i)).toBeInTheDocument()
  })

  it("affiche l'emoji image", () => {
    render(<CardEvent {...defaultProps} />)
    expect(screen.getByText('⚽')).toBeInTheDocument()
  })

  it('affiche la date quand fournie', () => {
    render(<CardEvent {...defaultProps} date="15 mars 2026" />)
    expect(screen.getByText(/15 mars 2026/i)).toBeInTheDocument()
  })

  it("n'affiche pas la date si non fournie", () => {
    render(<CardEvent {...defaultProps} />)
    expect(screen.queryByText(/15 mars/i)).not.toBeInTheDocument()
  })

  it('affiche le badge catégorie', () => {
    render(<CardEvent {...defaultProps} category="Football" />)
    expect(screen.getByText('Football')).toBeInTheDocument()
  })

  it("n'affiche pas le badge catégorie si non fourni", () => {
    render(<CardEvent {...defaultProps} />)
    expect(screen.queryByText(/football/i)).not.toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Indicateur LIVE
// ---------------------------------------------------------------------------
describe('CardEvent – LIVE', () => {
  it('affiche le badge LIVE quand isLive=true', () => {
    render(<CardEvent {...defaultProps} isLive />)
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it("n'affiche pas LIVE par défaut", () => {
    render(<CardEvent {...defaultProps} />)
    expect(screen.queryByText('LIVE')).not.toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Lien vs article cliquable
// ---------------------------------------------------------------------------
describe('CardEvent – navigation', () => {
  it('rend un lien <a> quand href est fourni', () => {
    render(<CardEvent {...defaultProps} href="/match/1" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/match/1')
  })

  it('rend un <article> quand href est absent', () => {
    const { container } = render(<CardEvent {...defaultProps} />)
    expect(container.querySelector('article')).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('appelle onClick quand on clique sur la carte sans href', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<CardEvent {...defaultProps} onClick={handleClick} />)
    await user.click(screen.getByRole('article'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
