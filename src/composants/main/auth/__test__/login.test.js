import React from "react";
import {screen} from "@testing-library/react";
import { renderHook } from '@testing-library/react-hooks';
import Login from "../login";

test('teste input email', () => {
  renderHook(<Login />)
  const input = screen.findByPlaceholderText('email')
  
})

test('teste input password', () => {
  renderHook(<Login />)
    const form = document.querySelector('#form')
    const input = screen.findByPlaceholderText('Password')
    
  })

  test('teste titlte', () => {
    renderHook(<Login />)
    const title = screen.findByTitle('Login')
    
  })

it("submits", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = renderHook(<Login onSubmit={onSubmit} />);
    const submitButton = screen.queryByText('submit')
    expect(submitButton).toBeNull();
    
  });


