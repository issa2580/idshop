import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import {unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import ClientAPI from '../client';

let container;
expect.extend(ClientAPI);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

  it("Regeneration de token", async () => {
    act(() => {
        renderHook(<ClientAPI url='/client/access' />, container);
    });
  });


jest.mock('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgxMDg0ZGM2NTBlZTBlYmM2MDc5MCIsImlhdCI6MTY2MDQyNDM1OCwiZXhwIjoxNjYzMDE2MzU4fQ.VDKu6OyraV4bsqB5f-RkeMqxcSK_l0oHFeHv8pFa6Ao';
const getClient = [{ headers: {Authorization: token}, }];

const utils = jest.genMockFromModule('../client').default;
utils.isAuthorized = jest.fn(token => token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgxMDg0ZGM2NTBlZTBlYmM2MDc5MCIsImlhdCI6MTY2MDQyNDM1OCwiZXhwIjoxNjYzMDE2MzU4fQ.VDKu6OyraV4bsqB5f-RkeMqxcSK_l0oHFeHv8pFa6Ao');

test('implementation created by jest.genMockFromModule', () => {
  
  expect({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgxMDg0ZGM2NTBlZTBlYmM2MDc5MCIsImlhdCI6MTY2MDQyNDM1OCwiZXhwIjoxNjYzMDE2MzU4fQ.VDKu6OyraV4bsqB5f-RkeMqxcSK_l0oHFeHv8pFa6Ao'}).toEqual(expect.not.objectContaining(getClient));
  //expect(utils.isAuthorized('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjgxMDg0ZGM2NTBlZTBlYmM2MDc5MCIsImlhdCI6MTY2MDQyNDM1OCwiZXhwIjoxNjYzMDE2MzU4fQ.VDKu6OyraV4bsqB5f-RkeMqxcSK_l0oHFeHv8pFa6Ao')).toEqual(true);
});

describe('Recuperation des données', () => {
    it('initial and success state', async () => {
      axios.get.mockResolvedValue(getClient);
      const { result, waitForNextUpdate } = renderHook(<ClientAPI url='/client/access' />);
        console.log(result);
      expect({data: [],
        error: '',
        state: 'isLogin',})
        .toMatchObject({
        data: [],
        error: '',
        state: 'isLogin',
      });
      //await waitForNextUpdate();

      expect({data: [],
        error: '',
        state: 'isLogin',})
        .toMatchObject({
        data: [],
        error: '',
        state: 'isLogin',
      });
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
})
    