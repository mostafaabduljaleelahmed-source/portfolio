import React, { useState } from 'react';
import { SITE_CONFIG, ProjectCase } from '../../config/siteConfig';
import { useAudio } from '../../context/AudioContext';
import { Github, ExternalLink, ChevronDown, Cpu, Target, Layers, Workflow, ShieldCheck, Check, ImageIcon } from 'lucide-react';
import { ProjectGallery } from './ProjectGallery';

interface CaseStudyProps {
  project: ProjectCase;
  isOpen: boolean;
  onToggle: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ project, isOpen, onToggle }) => {
  const panelId = `case-panel-${project.number}`;
  const media = project.media ?? [];
  const cover = media[0];

  return (
    <article className={`case ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="case-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="case-index">{project.number}</span>

        {cover && (
          <img
            className="case-thumb"
            src={cover.poster || cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        )}

        <span className="case-identity">
          <h3>{project.title}</h3>
          <span className="case-meta">{project.meta}</span>
        </span>

        <span className="case-tags" aria-hidden="true">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </span>

        <ChevronDown
          size={20}
          color={isOpen ? 'var(--accent)' : 'var(--text-muted)'}
          style={{
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform .2s ease'
          }}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="case-body" id={panelId}>
          {media.length > 0 ? (
            <ProjectGallery media={media} projectTitle={project.title} />
          ) : (
            <p className="case-media-missing">
              <ImageIcon size={14} aria-hidden="true" /> Screens and a short clip for this one are on the way.
            </p>
          )}

          <div className="case-block">
            <h4>Overview</h4>
            <p>{project.summary}</p>
          </div>

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
                  <ul>
                    {project.challenges.map(c => <li key={c}>{c}</li>)}
                  </ul>
                </div>
              )}
              {project.decisions.length > 0 && (
                <div>
                  <h4><ShieldCheck size={14} aria-hidden="true" /> Decisions &amp; trade-offs</h4>
                  <ul>
                    {project.decisions.map(d => <li key={d}>{d}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="case-block">
            <h4>Built with</h4>
            <div className="case-tags" style={{ justifyContent: 'flex-start', marginLeft: 0, marginTop: 8 }}>
              {project.technologies.map(tech => (
                <span key={tech} className="tag solid">{tech}</span>
              ))}
            </div>
          </div>

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

          {(project.code || project.link) && (
            <div className="case-actions">
              {project.code && (
                <a className="case-link" href={project.code} target="_blank" rel="noopener noreferrer">
                  <Github size={16} aria-hidden="true" /> Source code
                </a>
              )}
              {project.link && (
                <a className="case-link primary" href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} aria-hidden="true" /> View it live
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export const Projects: React.FC = () => {
  const { playClick } = useAudio();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    playClick();
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="scene work" id="work" aria-labelledby="work-heading">
      <div>
        <header className="section-head">
          <div className="eyebrow">Selected work / 01</div>
          <h2 id="work-heading">Things I&apos;ve built</h2>
          <p>
            Each one starts with the problem it solves, then how it is put together and what
            I had to decide along the way.
          </p>
        </header>

        <div className="case-list">
          {SITE_CONFIG.projects.map((project: ProjectCase, idx: number) => (
            <CaseStudy
              key={project.title}
              project={project}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
