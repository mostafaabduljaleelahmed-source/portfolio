import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from 'lucide-react';
import type { ProjectMedia } from '../../config/siteConfig';

interface Props {
  media: ProjectMedia[];
  projectTitle: string;
  /** Host shown in the fake browser chrome for web projects. */
  host?: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A project's media, presented in the device it actually runs on: a phone body
 * for the Android captures, browser chrome for the web ones. Video starts
 * playing, muted, once it scrolls into view — a portfolio visitor should not
 * have to press anything to see the work move.
 */
export const MediaFrame: React.FC<Props> = ({ media, projectTitle, host }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const active = media[activeIndex];
  const isPhone = active?.orientation === 'portrait';

  const step = useCallback(
    (delta: number) => setActiveIndex(prev => (prev + delta + media.length) % media.length),
    [media.length]
  );

  // Play/pause the in-frame video with visibility, so an off-screen clip is not
  // decoding in the background.
  useEffect(() => {
    const el = videoRef.current;
    const frame = frameRef.current;
    if (!el || !frame || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay refused — the controls are still there */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [activeIndex]);

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

  if (media.length === 0) {
    return (
      <div className="frame-empty">
        <Play size={16} aria-hidden="true" />
        <span>Screens for this one are on the way.</span>
      </div>
    );
  }

  const screen =
    active.type === 'video' ? (
      <video
        ref={videoRef}
        key={active.src}
        src={active.src}
        poster={active.poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        className="frame-screen"
        aria-label={active.alt}
      />
    ) : (
      <img key={active.src} src={active.src} alt={active.alt} loading="lazy" decoding="async" className="frame-screen" />
    );

  return (
    <div className={`media-frame ${isPhone ? 'is-phone' : 'is-web'}`} ref={frameRef}>
      <div className="device">
        {!isPhone && (
          <div className="device-chrome" aria-hidden="true">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            {host && <span className="device-url">{host}</span>}
          </div>
        )}
        <div className="device-screen">
          {screen}
          <button
            type="button"
            className="frame-expand"
            onClick={() => setLightboxOpen(true)}
            aria-label={`Open ${projectTitle} media at full size`}
          >
            <Maximize2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {active.caption && <p className="frame-caption">{active.caption}</p>}

      {media.length > 1 && (
        <div className="frame-thumbs" role="tablist" aria-label={`${projectTitle} screens`}>
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={item.alt}
              className={`frame-thumb ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={item.poster || item.src} alt="" loading="lazy" decoding="async" />
              {item.type === 'video' && (
                <span className="frame-thumb-play" aria-hidden="true">
                  <Play size={12} />
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
          <button type="button" className="gallery-close" onClick={() => setLightboxOpen(false)} aria-label="Close viewer">
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
            {active.type === 'video' ? (
              <video src={active.src} poster={active.poster} controls autoPlay loop playsInline className="gallery-full" />
            ) : (
              <img src={active.src} alt={active.alt} className="gallery-full" />
            )}
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
