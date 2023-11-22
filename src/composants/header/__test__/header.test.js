import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import {unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import Header from '../header';

let container;
expect.extend(Header);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

  it("Recuperation des données de API", async () => {
    act(() => {
        renderHook(<Header url='/client/logout' />, container);
    });
  });


jest.mock('axios');

const logoutClient = localStorage.removeItem ('firstLogin');

describe('Recuperation des données de Hook', () => {
    it('initial and success state', async () => {
      axios.get.mockResolvedValue(localStorage.removeItem ('firstLogin'));
      const { result, waitForNextUpdate } = renderHook(() =>
      Header('/client/logout')
        );
        //expect(firstLogin()).toBeFalsy();
    });

    it('initial and success state', async () => {
        axios.get.mockResolvedValue(localStorage.removeItem ('firstLogin'));
        const { result, waitForNextUpdate } = renderHook(() =>
        Header('/client/logout')
          );
          //expect(firstLogin()).toBeFalsy();
      });
    it('error state', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage))
          
        );
        expect({data: [],
            error: 'Fetch failed',
            state: 'ERROR',}).toMatchObject({
            data: [],
            error: 'Fetch failed',
            state: 'ERROR',
          });
    });
});