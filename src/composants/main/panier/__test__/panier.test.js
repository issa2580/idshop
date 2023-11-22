import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Panier from '../panier';


describe('Test rendu du composant panier', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'))
  afterAll(() => window.fetch.mockClear())
  
  test('contenu card du panier', async () => {
    window.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        id_Produit: "999999",
        Panier: [
          {
            title: "Asus ZenBook",
            description: "Asus ZenBook",
            contenu: "Asus ZenBook",
            prix: 125000,
            imageUrl: "https://path-to-some-image.jpg"
          },
          {
            title: "Modem/Routeur",
            description: "Modem/Routeur",
            contenu: "Modem/Routeur",
            prix: 12500,
            imageUrl: "https://path-to-some-image.jpg"
          },
          {
            title: "Samsung Galaxy A03",
            description: "Samsung Galaxy A03",
            contenu: "Samsung Galaxy A03",
            prix: 72500,
            imageUrl: "https://path-to-some-image.jpg"
          }
        ]
      }),
    })
    
   
  });
});