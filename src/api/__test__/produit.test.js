import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import {unmountComponentAtNode } from "react-dom";
import axios from 'axios';
import ProduitsAPI from '../produit';

let container;
expect.extend(ProduitsAPI);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});

  it("Recuperation des données de APi", async () => {
    act(() => {
        renderHook(<ProduitsAPI url='/api/produit' />, container);
    });
  });


jest.mock('axios');

const fetchProduit = [{ 
  id: '62fe333fc5212a525007b949',
 libelle: "ordinateur Zenbook",
  contenu: "ordinateur Zenbook",
   description: "ordinateur Zenbook",
    prix: 125000,
     category: "ordinateur",
      image: "https://www.google.com/search?q=google+ordinateur&client=avast-a-1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj87KfUoKP6AhWTwoUKHS-OC1kQ_AUoAXoECAIQAw&biw=1366&bih=625&dpr=1#imgrc=544JTy6qzFUNPM",
     }];

describe('Recuperation des données', () => {
    it('état initial et état de réussite', async () => {
      axios.get.mockResolvedValue(fetchProduit);
      const { result, waitForNextUpdate } = renderHook(() =>
      ProduitsAPI(`/api/produit?${category}&${sort}&$limit=${page*9}`)
        );
        expect({data: [],
        error: '',
        state: 'produit',})
        .toMatchObject({
        data: [],
        error: '',
        state: 'produit',
      });

      //jest.advanceTimersByTime(100);
      //await waitForNextUpdate();
      
      expect({
        data: [],
        error: '',
        state: 'produit',})
        .toMatchObject({
        data: [],
        error: '',
        state: 'produit',
      });
    });
    it('error state', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage))
          
        );
        expect({
            data: [],
            error: 'Fetch failed',
            state: 'error',})
            .toMatchObject({
            data: [],
            error: 'Fetch failed',
            state: 'error',
          });
    });
});