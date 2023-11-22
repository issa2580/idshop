import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react'
import {unmountComponentAtNode } from "react-dom";
import {Routes} from 'react-router-dom'
import '@testing-library/jest-dom'
import Main from './main'


let container;
//expect.extend(Main);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});


test('rendu des liens de navigation', async () => {
    renderHook(
    <Routes>
      <Main />
    </Routes>,
  )
 
})

describe('Chemins d acces des routes', () => {
  const MOCK_FILE = {
    './auth/login': 'console.log("contenu login");',
  };

  test('includes all files in the directory in the summary', () => {
    const File = require('./auth/login');
    //expect(File.length).to.equal('login');
  });
});


