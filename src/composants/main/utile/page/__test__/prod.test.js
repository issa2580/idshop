import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ProduitItems from '../prod';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('Teste rendu du composant ProduitItems', async () => {
  renderHook(
    <ProduitItems />
)
})

it('Teste rendu du fonction supProduit ', () => {
  
  act(() => {
    ReactDOM.createRoot(container).render(<supProduit />);
  });
  const button = container.querySelector('button');
  const span = container.querySelector('span');
  const img = container.querySelector('img');
  const text = container.querySelector('col');

});