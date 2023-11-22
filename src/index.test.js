import React from "react";
import ReactDOM from 'react-dom';
import App from '../src/App';


it('rendu du server dapplication', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


   
