import React from 'react';
import './Footer.css';
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="social-icons">
          <FaXTwitter className="icon" />
          <FaInstagram className="icon" />
          <FaYoutube className="icon" />
          <FaLinkedin className="icon" />
        </div>

        <div className="footer-column">
          <h4>Categorías</h4>
          <ul>
            <li>Ropa</li>
            <li>Calzados</li>
            <li>Accesorios</li>
            <li>Edición Limitada</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Empresa</h4>
          <ul>
            <li>Contacto</li>
            <li>Soporte</li>
            <li>Ubicación</li>
          </ul>
        </div>

        <div className="footer-subscribe">
          <h4>¡Únete a nosotros!</h4>
          <p>Suscríbete para recibir ofertas y novedades exclusivas.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Correo electrónico..." />
            <button>REGÍSTRATE</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Urban Underground. Todos los derechos reservados.
      </div>
    </footer>
  );
}