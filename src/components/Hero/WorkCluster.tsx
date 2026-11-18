import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Pause, Play } from 'lucide-react';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * The hero visual is the work itself: the phone app running, with the web app
 * behind it. An abstract 3D scene said nothing about what Mostafa builds —
 * these two screens say it immediately.
 *
 * The clip is decoration, so it is muted and silent, but autoplay still has to
 * be escapable: there is a pause control, it stops when scrolled out of view,
 * and reduced-motion visitors get a still frame.
 */
export const WorkCluster: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(reducedMotion);
  const [paused, setPaused] = useState(reducedMotion);

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduced(q.matches);
      setPaused(q.matches);
    };
    q.addEventListener('change', sync);
    return () => q.removeEventListener('change', sync);
  }, []);

  // Honour the user's choice first, then visibility: a clip nobody can see
  // should not be decoding.
  useEffect(() => {
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    if (paused) {
      el.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            /* autoplay refused — the poster still shows the app */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [paused]);

  const toggle = useCallback(() => setPaused(p => !p), []);

  return (
    <div className="cluster" ref={wrapRef}>
      <div className="cluster-web" aria-hidden="true">
        <div className="cluster-chrome">
          <span /><span /><span />
          <em>barber-house-demo.vercel.app</em>
        </div>
        <img
          src="/media/barber-house/01-hero.jpg"
          alt=""
          loading="eager"
          decoding="async"
          width={1512}
          height={785}
        />
      </div>

      <div className="cluster-phone">
        <video
          ref={videoRef}
          src="/media/negma-fit/walkthrough.mp4"
          poster="/media/negma-fit/poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="The Negma Fit inventory app being used on a phone"
        />
        {!reduced && (
          <button type="button" className="cluster-toggle" onClick={toggle} aria-pressed={paused}>
            {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            <span className="sr-only">{paused ? 'Play the clip' : 'Pause the clip'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
