import React from 'react';
import DetailProduits from "../detailProduits";
import { renderHook, act } from '@testing-library/react-hooks';



test('Text test ', ()=>{
    const component = renderHook(
        <DetailProduits />
    );
    //expect(component.find('h2')).toEqual("h2");
});