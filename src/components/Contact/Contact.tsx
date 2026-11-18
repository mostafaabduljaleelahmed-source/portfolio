import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { label: 'WhatsApp', value: '+20 101 131 9867', href: SITE_CONFIG.whatsapp },
  { label: 'GitHub', value: 'mostafaabduljaleelahmed-source', href: SITE_CONFIG.github },
  { label: 'LinkedIn', value: 'Mostafa Abduljaleel', href: SITE_CONFIG.linkedin }
];

export const Contact: React.FC = () => (
  <section className="band band-bone contact" id="contact">
    <div className="wrap">
      <p className="eyebrow">Contact / 04</p>
      <h2 className="contact-title">
        Got something
        <br />
        that should <em>work better?</em>
      </h2>
      <p className="lede">
        Open to internships and junior roles, and to freelance work. Cairo, or remote.
      </p>

      <ul className="contact-list">
        {LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
              <span className="mono">{l.label}</span>
              <span className="contact-value">{l.value}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
