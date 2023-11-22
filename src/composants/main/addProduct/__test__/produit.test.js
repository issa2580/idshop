import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import {unmountComponentAtNode } from "react-dom";
import '@testing-library/jest-dom'
import axios from 'axios';
import AddProduit from '../produit';

let container;
expect.extend(AddProduit);

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  document.body.removeChild(container);
  container = null;
});


jest.mock('axios');

const handlerUpload = [{ file : 'https://www.google.com/search?q=google+ordinateur&client=avast-a-1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj87KfUoKP6AhWTwoUKHS-OC1kQ_AUoAXoECAIQAw&biw=1366&bih=625&dpr=1#imgrc=544JTy6qzFUNPM.eyJpZCI6IjYyZjgxMDg0ZGM2NTBlZTBlYmM2MDc5MCIsImlhdCI6MTY2MDQyNDM1OCwiZXhwIjoxNjYzMDE2MzU4fQ.VDKu6OyraV4bsqB5f-RkeMqxcSK_l0oHFeHv8pFa6Ao', }];
const handleSup = [{ file : 'https://www.google.com/search?q=google+ordinateur&client=avast-a-1&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj87KfUoKP6AhWTwoUKHS-OC1kQ_AUoAXoECAIQAw&biw=1366&bih=625&dpr=1#imgrc=544JTy6qzFUNPM.eyJpZCI6IjYyZjgxMDg0ZGM2NTBlZTBlYmM2MDc5MCIsImlhdCI6MTY2MDQyNDM1OCwiZXhwIjoxNjYzMDE2MzU4fQ.VDKu6OyraV4bsqB5f-RkeMqxcSK_l0oHFeHv8pFa6Ao', }];

describe('Recuperation des données de Hook', () => {
    it('initial and success state', async () => {
      axios.get.mockResolvedValue(handlerUpload);
      const { result, waitForNextUpdate } = renderHook(() =>
      AddProduit('/api/upload')
        );
        /*
        expect
        */
   
    });
});

describe('Recuperation des données de Hook', () => {
    it('initial and success state', async () => {
      axios.post.mockResolvedValue(handleSup);
      const { result, waitForNextUpdate } = renderHook(() =>
      AddProduit('/api/destroy')
        );
        /*
        expect(result.current.prod).toEqual([]);
        */
        
    });
});

  it("Recuperation des données de API", async () => {
    act(() => {
        renderHook(<AddProduit url='/api/produit' />, container);
    });
  });


 