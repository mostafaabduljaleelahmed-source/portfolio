import React from 'react';
import { SITE_CONFIG, ProjectCase } from '../../config/siteConfig';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => (
  <section className="hero" id="hero-section" aria-label="Introduction">
    <div className="hero-grid wrap">
      <p className="eyebrow hero-meta">
        <span className="status-dot" aria-hidden="true" />
        Open to internships &amp; junior roles
      </p>
      <p className="eyebrow hero-place">Cairo, Egypt</p>

      <h1 className="hero-title">
        I build the small software that <em>real businesses</em> run on.
      </h1>

      <figure className="hero-portrait">
        <picture>
          <source media="(max-width: 700px)" srcSet="/assets/portrait-sm.webp" />
          <img
            src="/assets/portrait.webp"
            alt="Mostafa Abduljaleel"
            width={900}
            height={1050}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </figure>

      <div className="hero-intro">
        <p className="hero-lede">
          Mostafa Abduljaleel — Information Technology at Cairo University.
          A shop that counts its stock on my app every night, a barbershop whose
          queue lives on a phone, a bot that reads my class group chats so I
          don&apos;t have to.
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
    </div>

    {/* A plain index of the work, the way a contents page would set it out */}
    <nav className="hero-index wrap" aria-label="Projects">
      {SITE_CONFIG.projects.map((p: ProjectCase) => (
        <a key={p.title} href="#work" className="index-row">
          <span className="mono index-n">{p.number}</span>
          <span className="index-title">{p.title}</span>
          <span className="index-meta">{p.meta}</span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      ))}
    </nav>
  </section>
);
