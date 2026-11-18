import React, { useState } from 'react';
import { SITE_CONFIG, ProjectCase } from '../../config/siteConfig';
import { MediaFrame } from './MediaFrame';
import { Github, ExternalLink, Plus, Minus, Cpu, Target, Layers, Workflow, ShieldCheck, Check } from 'lucide-react';

function hostOf(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return undefined;
  }
}

interface ShowcaseProps {
  project: ProjectCase;
  flip: boolean;
}

const Showcase: React.FC<ShowcaseProps> = ({ project, flip }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const media = project.media ?? [];
  const isPhone = media[0]?.orientation === 'portrait';
  const detailId = `detail-${project.number}`;

  return (
    <article className={`showcase ${flip ? 'is-flipped' : ''} ${isPhone ? 'is-phone' : 'is-web'}`}>
      <div className="showcase-media">
        <MediaFrame media={media} projectTitle={project.title} host={hostOf(project.link)} />
      </div>

      <div className="showcase-copy">
        <div className="showcase-eyebrow">
          <span className="showcase-number">{project.number}</span>
          <span>{project.meta}</span>
        </div>

        <h3 className="showcase-title">{project.title}</h3>
        <p className="showcase-summary">{project.summary}</p>

        {project.decisions.length > 0 && (
          <ul className="showcase-points">
            {project.decisions.slice(0, 2).map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}

        <div className="showcase-tags">
          {project.technologies.map(tech => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        <div className="showcase-actions">
          {project.link && (
            <a className="case-link primary" href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} aria-hidden="true" /> View it live
            </a>
          )}
          {project.code && (
            <a className="case-link" href={project.code} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" /> Source code
            </a>
          )}
          <button
            type="button"
            className="case-link ghost"
            onClick={() => setDetailOpen(o => !o)}
            aria-expanded={detailOpen}
            aria-controls={detailId}
          >
            {detailOpen ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {detailOpen ? 'Hide the detail' : 'How it works'}
          </button>
        </div>

        {detailOpen && (
          <div className="showcase-detail" id={detailId}>
            <div className="case-grid case-block">
              <div>
                <h4><Cpu size={14} aria-hidden="true" /> The problem</h4>
                <p>{project.problem}</p>
              </div>
              <div>
                <h4><Target size={14} aria-hidden="true" /> The goal</h4>
                <p>{project.goal}</p>
              </div>
            </div>

            <div className="case-block">
              <h4><Layers size={14} aria-hidden="true" /> Architecture</h4>
              <p>{project.architecture}</p>
              {project.architectureDiagram && (
                <div className="case-diagram" role="img" aria-label={`${project.title} architecture diagram`}>
                  {project.architectureDiagram.join('\n')}
                </div>
              )}
            </div>

            {(project.challenges.length > 0 || project.decisions.length > 0) && (
              <div className="case-grid case-block">
                {project.challenges.length > 0 && (
                  <div>
                    <h4><Workflow size={14} aria-hidden="true" /> Hard parts</h4>
                    <ul>{project.challenges.map(c => <li key={c}>{c}</li>)}</ul>
                  </div>
                )}
                {project.decisions.length > 0 && (
                  <div>
                    <h4><ShieldCheck size={14} aria-hidden="true" /> Decisions &amp; trade-offs</h4>
                    <ul>{project.decisions.map(d => <li key={d}>{d}</li>)}</ul>
                  </div>
                )}
              </div>
            )}

            {project.results.length > 0 && (
              <div className="case-block">
                <h4>Outcome</h4>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {project.results.map(res => (
                    <li key={res} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <Check size={15} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 4 }} aria-hidden="true" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export const Projects: React.FC = () => (
  <section className="band band-bone work" id="work" aria-labelledby="work-heading">
    <div className="wrap">
      <header className="section-head">
        <div className="eyebrow">Selected work / 01</div>
        <h2 id="work-heading">Things I&apos;ve built</h2>
        <p>
          Three that are in real use. Each one starts with the problem it solves, and you can open
          up how it is put together.
        </p>
      </header>

      <div className="work-feed">
        {SITE_CONFIG.projects.map((project: ProjectCase, idx: number) => (
          <Showcase key={project.title} project={project} flip={idx % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);
