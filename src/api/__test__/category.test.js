import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import {unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import CategoryAPI from '../category';

let container;
expect.extend(CategoryAPI);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

  it("Recuperation des données de APi ", async () => {
    act(() => {
        renderHook(<CategoryAPI url='/api/category' />, container);
    });
  });


jest.mock('axios');

const ajoutCategory = [{ id: '62fe333fc5212a525007b949', name: "ordinateur", }];

describe('Recuperation des données', () => {
    it('état initial et état de réussite', async () => {
      axios.get.mockResolvedValue(ajoutCategory);
      const { result, waitForNextUpdate } = renderHook(() =>
      CategoryAPI('/api/category')
        );
        expect({data: [],
        error: '',
        state: 'category',})
        .toMatchObject({
        data: [],
        error: '',
        state: 'category',
      });
      await waitForNextUpdate();

      expect({data: [],
        error: '',
        state: 'category',})
        .toMatchObject({
        data: [],
        error: '',
        state: 'category',
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
});