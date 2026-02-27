import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#020617' },
        { name: 'panel', value: '#0f172a' },
        { name: 'light', value: '#f8fafc' },
      ],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
