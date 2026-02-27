import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, PrimaryButton, SecondaryButton } from '../Button'

// ---------------------------------------------------------------------------
// Button générique
// ---------------------------------------------------------------------------
describe('Button', () => {
  it('affiche le texte enfant', () => {
    render(<Button>Voter MVP</Button>)
    expect(screen.getByRole('button', { name: /voter mvp/i })).toBeInTheDocument()
  })

  it('applique la variante primary par défaut', () => {
    render(<Button>Test</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/from-accent-live|primary/)
  })

  it('est désactivé quand disabled=true', () => {
    render(<Button disabled>Indisponible</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('est désactivé quand isLoading=true', () => {
    render(<Button isLoading>Chargement</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('affiche le spinner en état isLoading', () => {
    const { container } = render(<Button isLoading>Chargement</Button>)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(screen.queryByText('Chargement')).not.toBeInTheDocument()
  })

  it('appelle onClick au clic', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Cliquer</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("n'appelle pas onClick si disabled", async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    render(
      <Button disabled onClick={handleClick}>
        Désactivé
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('affiche leftIcon et rightIcon', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Milieu
      </Button>
    )
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
    expect(screen.getByText('Milieu')).toBeInTheDocument()
  })

  it('applique la variante secondary', () => {
    render(<Button variant="secondary">Filtrer</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/backdrop-blur|secondary/)
  })

  it('applique la taille sm', () => {
    render(<Button size="sm">Petit</Button>)
    expect(screen.getByRole('button').className).toMatch(/px-4/)
  })

  it('applique la taille lg', () => {
    render(<Button size="lg">Grand</Button>)
    expect(screen.getByRole('button').className).toMatch(/px-8/)
  })

  it('accepte className supplémentaire', () => {
    render(<Button className="my-custom-class">Custom</Button>)
    expect(screen.getByRole('button').className).toContain('my-custom-class')
  })
})

// ---------------------------------------------------------------------------
// PrimaryButton
// ---------------------------------------------------------------------------
describe('PrimaryButton', () => {
  it('rend un bouton accessible', () => {
    render(<PrimaryButton>Voir</PrimaryButton>)
    expect(screen.getByRole('button', { name: /voir/i })).toBeInTheDocument()
  })

  it('est désactivé quand isLoading', () => {
    render(<PrimaryButton isLoading>…</PrimaryButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})

// ---------------------------------------------------------------------------
// SecondaryButton
// ---------------------------------------------------------------------------
describe('SecondaryButton', () => {
  it('rend un bouton accessible', () => {
    render(<SecondaryButton>Partager</SecondaryButton>)
    expect(screen.getByRole('button', { name: /partager/i })).toBeInTheDocument()
  })

  it('transmet type="submit"', () => {
    render(<SecondaryButton type="submit">Envoyer</SecondaryButton>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
