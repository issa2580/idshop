import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Baniere from './composants/baniere/baniere';
import Footer from './composants/footer/footer';
import Header from './composants/header/header';
import Main from './composants/main/main';
import {State} from './etat';


function App() {
  return (
    <State>
      <Router>
        <div className="App">
          <Header />
          <Baniere />
          <Main />
          <Footer />
        </div>
      </Router>
    </State> 
  );
}

export default App;
