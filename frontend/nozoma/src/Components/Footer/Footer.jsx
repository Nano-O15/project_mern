import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaQuestionCircle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>À PROPOS DE MAUVAISCOINS</h3>
          <ul>
            <li><a href="#">Qui sommes-nous ?</a></li>
            <li><a href="#">Nous rejoindre</a></li>
            <li><a href="#">Impact environnemental</a></li>
            <li><a href="#">Conditions générales d'utilisation</a></li>
            <li><a href="#">Confidentialité</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>NOS SERVICES</h3>
          <ul>
            <li><a href="/deposit">Déposer une annonce</a></li>
            <li><a href="/pro">Offres pour les professionnels</a></li>
            <li><a href="/pricing">Publicité</a></li>
            <li><a href="/services">Services de paiement</a></li>
            <li><a href="/books">Livres sur MauvaisCoins</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>INFORMATIONS PRATIQUES</h3>
          <ul>
            <li><a href="/help">Aide</a></li>
            <li><a href="/security">Conseils de sécurité</a></li>
            <li><a href="/contact">Contacter MauvaisCoins</a></li>
            <li><a href="/sitemap">Plan du site</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>TROUVEZ-NOUS SUR</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <FaFacebookF /> Facebook
            </a>
            <a href="#" className="social-link">
              <FaTwitter /> Twitter
            </a>
            <a href="#" className="social-link">
              <FaLinkedinIn /> LinkedIn
            </a>
          </div>
          <div className="help-section">
            <FaQuestionCircle />
            <span>Besoin d'aide ?</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>MauvaisCoins - 2024 ©</p>
          <p>
            <a href="/mentions-legales">Mentions légales</a> -
            <a href="/cgu">CGU</a> -
            <a href="/confidentialite">Politique de Confidentialité</a> -
            <a href="/cookies">Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;