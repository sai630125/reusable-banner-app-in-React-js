import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App component', () => {
  test('renders login form', () => {
    render(<App />)
    expect(screen.getByRole('heading', {name: 'Login'})).toBeInTheDocument()
    expect(screen.getByLabelText('User Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  test('renders dashboard on successful login', async () => {
    const mockResponse = {
      id: 1,
      username: 'afm',
      fullName: 'AFM User',
      email: 'afm@example.com',
    }

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    )

    render(<App />)
    await userEvent.type(screen.getByLabelText('User Name'), 'afm')
    await userEvent.type(screen.getByLabelText('Password'), 'afm')
    await userEvent.click(screen.getByRole('button', {name: 'Login'}))

    expect(await screen.findByText('User Dashboard')).toBeInTheDocument()
    global.fetch.mockRestore()
  })
})
