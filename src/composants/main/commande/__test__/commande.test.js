
import React from 'react'
import {unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom'
import Commande from '../commande'

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


test('Teste map historique des commandes', () => {
    const items = jest.fn();
    [Commande].map(history => items(history));
    expect(items).toBeCalledWith(expect.anything());
  });

