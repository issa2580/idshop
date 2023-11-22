
import {render, screen, fireEvent, getByPlaceholderText} from '@testing-library/react'
import Register from '../register'


const Button = ({onClick, children}) => (
  <button onClick={onClick}>{children}</button>
)

test('appel le boutton submit', () => {
  const registerSubmit = jest.fn()
  render(<Button onClick={registerSubmit}>Inscrire </Button>)
  fireEvent.click(screen.getByText(/inscrire/i))
  expect(registerSubmit).toHaveBeenCalledTimes(1)
})



