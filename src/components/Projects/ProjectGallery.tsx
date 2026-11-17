import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { ProjectMedia } from '../../config/siteConfig';

interface Props {
  media: ProjectMedia[];
  projectTitle: string;
}

/**
 * Shows a project's screenshots and clips. The point of the section is that a
 * visitor sees the work without leaving the page or installing anything, so the
 * gallery sits above the write-up and the first item is shown large.
 */
export const ProjectGallery: React.FC<Props> = ({ media, projectTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const active = media[activeIndex];

  const step = useCallback(
    (delta: number) => {
      setActiveIndex(prev => (prev + delta + media.length) % media.length);
    },
    [media.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, step]);

  if (media.length === 0) return null;

  const stageClass = `gallery-stage-media ${active.orientation === 'portrait' ? 'is-portrait' : ''}`;

  const renderItem = (item: ProjectMedia, full: boolean) =>
    item.type === 'video' ? (
      <video
        src={item.src}
        poster={item.poster}
        controls
        playsInline
        preload="metadata"
        className={full ? 'gallery-full' : stageClass}
        aria-label={item.alt}
      />
    ) : (
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className={full ? 'gallery-full' : stageClass}
      />
    );

  return (
    <div className="gallery">
      <figure className={`gallery-stage ${active.orientation === 'portrait' ? 'is-portrait' : ''}`}>
        <button
          type="button"
          className="gallery-stage-btn"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${projectTitle} media at full size`}
        >
          {renderItem(active, false)}
        </button>
        {active.caption && <figcaption className="gallery-caption">{active.caption}</figcaption>}
      </figure>

      {media.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label={`${projectTitle} screenshots`}>
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={item.alt}
              className={`gallery-thumb ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img
                src={item.poster || item.src}
                alt=""
                loading="lazy"
                decoding="async"
                className={item.orientation === 'portrait' ? 'is-portrait' : ''}
              />
              {item.type === 'video' && (
                <span className="gallery-thumb-play" aria-hidden="true">
                  <Play size={14} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} media viewer`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="gallery-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close viewer"
          >
            <X size={22} />
          </button>

          {media.length > 1 && (
            <button
              type="button"
              className="gallery-nav prev"
              onClick={e => { e.stopPropagation(); step(-1); }}
              aria-label="Previous"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          <div className="gallery-lightbox-inner" onClick={e => e.stopPropagation()}>
            {renderItem(active, true)}
            {active.caption && <p className="gallery-caption">{active.caption}</p>}
          </div>

          {media.length > 1 && (
            <button
              type="button"
              className="gallery-nav next"
              onClick={e => { e.stopPropagation(); step(1); }}
              aria-label="Next"
            >
              <ChevronRight size={26} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
