import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Home from '@/app/page'
import Providers from '@/components/Providers'

describe('Home page', () => {
  it('renders without crashing', () => {
    render(
      <Providers>
        <Home />
      </Providers>
    )
    expect(document.querySelector('main')).toBeInTheDocument()
  })
})
