import {render, screen} from '@testing-library/react'
import App from './App'

describe('App component', () => {
  test('renders the heading text', () => {
    render(<App />)
    expect(screen.getByText('Saikrishnareddy')).toBeInTheDocument()
  })
})
