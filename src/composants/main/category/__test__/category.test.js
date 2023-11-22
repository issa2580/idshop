import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import {unmountComponentAtNode } from "react-dom";
import ReactDOM from 'react-dom/client';
import Category from '../category';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

it('Teste rendu des bouttons', () => {
  
  act(() => {
    const { result } = renderHook(() => Category())
    ReactDOM.createRoot(container).result;
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');

});

it("Teste rendu de Hook avec le ou sans le nom du category", () => {
  act(() => {
    renderHook(<Category />, container);
  });
 
  act(() => {
    renderHook(<Category name="category" />, container);
  });

});

jest.mock('axios');

const useApiMockData = [{ id: '62fe237714d6c7837c3c2dc1',
libelle: "ordinateur", }];

function fetchMock(url, suffix = "") {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        json: () =>
          Promise.resolve({
            data: url + suffix,
          }),
      });
    }, 200 + Math.random() * 300)
  );
}


beforeAll(() => {
  jest.spyOn(global, "fetch").mockImplementation(fetchMock);
});

afterAll(() => {
  global.fetch.mockClear();
});