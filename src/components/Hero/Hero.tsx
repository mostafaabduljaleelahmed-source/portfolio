import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { WorkCluster } from './WorkCluster';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => (
  <section className="hero" id="hero-section" aria-label="Introduction">
    <div className="hero-inner">
      <div className="hero-copy">
        <p className="eyebrow hero-status">
          <span className="status-dot" aria-hidden="true" />
          Open to internships &amp; junior roles
        </p>

        <h1 className="hero-title">
          I build the small
          <br />
          software that
          <br />
          <em>real businesses</em>
          <br />
          run on.
        </h1>

        <p className="hero-lede">
          Mostafa Abduljaleel — Information Technology at Cairo University.
          A shop that counts its stock on my app every night, a barbershop whose
          queue lives on a phone, a bot that reads my class group chats so I don&apos;t
          have to.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">
            See the work <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className="btn btn-quiet">
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <WorkCluster />
      </div>
    </div>

    <div className="hero-ticker" aria-hidden="true">
      <div className="ticker-track">
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i}>
            React &amp; TypeScript <i>/</i> .NET &amp; C# <i>/</i> Capacitor &amp; Flutter
            <i>/</i> Supabase &amp; SQL Server <i>/</i> Python automation <i>/</i> LLM APIs <i>/</i>
          </span>
        ))}
      </div>
    </div>
  </section>
);
