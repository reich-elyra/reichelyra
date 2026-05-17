import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(document.querySelector('main')).toBeInTheDocument()
  })
})
