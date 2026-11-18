import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="wrap footer-inner">
      <span className="mono">© {new Date().getFullYear()} {SITE_CONFIG.name}</span>
      <span className="mono">Built in Cairo</span>
    </div>
  </footer>
);
