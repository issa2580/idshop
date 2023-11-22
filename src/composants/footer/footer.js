import React from "react";
import FaceBook from './icons/facebook.svg';
import Linkedin from './icons/linkedin.svg';
import Instagram from './icons/instagram.svg';
import Twitter from './icons/twitter.svg';
import Whatsapp from './icons/whatsapp.svg';
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Entreprise</h4>
          <ul>
            <p>
            ID SHOP est une entreprise 
             de vente de fourniture informatique
              qui fournir une large gamme de produits informatiques.
            </p>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Assistance</h4>
          <ul>
            <li><a href="#">Informatique</a></li>
            <li><a href="#">Systeme</a></li>
            <li><a href="#">Reseau</a></li>
            <li><a href="#">Site Web</a></li>
            <li><a href="#">Design Web</a></li>
            <li><a href="#">Photo & Video</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Vente</h4>
          <ul>
            <li><a href="#">Ordinateur</a></li>
            <li><a href="#">Telephone</a></li>
            <li><a href="#">Modem</a></li>
            <li><a href="#">Tablette</a></li>
            <li><a href="#">montre</a></li>
            <li><a href="#">Switch</a></li>
            <li><a href="#">Routeur</a></li>
            <li><a href="#">Camera</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <div class="social-links">
            <Link to = '/'>
              <img className="facebook" src = {FaceBook} alt = "" width = '30' />
            </Link>
            <Link to = '/'>
              <img src = {Twitter} alt = "" width = '30' />
            </Link>
            <Link to = '/'>
              <img src = {Instagram} alt = "" width = '30' />
            </Link>
            <Link to = '/'>
              <img src = {Whatsapp} alt = "" width = '30' />
            </Link>
            <Link to = '/'>
              <img src = {Linkedin} alt = "" width = '30' />
            </Link>
          </div>
        </div>
      </div>
    </div>
 </footer>
  );
};

export default Footer;