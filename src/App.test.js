import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../src/App';

let app = null;
beforeEach(() => {
 
  app = document.createElement("div");
  document.body.appendChild(app);
});

afterEach(() => {
  
  unmountComponentAtNode(app);
  app.remove();
  app = null;
});

it('rendu du server dapplication', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Teste rendu de la page dacceuil', () => {
  render(<App />);
});
   
