import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Pointe vers le répertoire racine de l'application Next.js
  dir: './',
})

const config: Config = {
  displayName: 'sport-union',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/components/**/*.stories.{ts,tsx}',
    '!src/components/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
}

export default createJestConfig(config)
