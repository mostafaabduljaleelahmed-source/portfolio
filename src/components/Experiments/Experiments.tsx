import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const Experiments: React.FC = () => (
  <section className="band band-ink lab" id="experiments">
    <div className="wrap">
      <p className="eyebrow">In progress / 03</p>
      <h2 className="lab-title">On the bench</h2>
      <div className="signals">
        {SITE_CONFIG.experiments.map(exp => (
          <article className="signal" key={exp.title}>
            <span className="mono signal-tag">{exp.tag}</span>
            <h3>{exp.title}</h3>
            <p>{exp.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
