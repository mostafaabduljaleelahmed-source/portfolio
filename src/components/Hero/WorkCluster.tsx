import React, { useEffect, useRef, useState } from 'react';

/**
 * The hero visual is the work itself: the phone app running, with the web app
 * behind it. An abstract 3D scene said nothing about what Mostafa builds —
 * these two screens say it immediately.
 */
export const WorkCluster: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(q.matches);
    q.addEventListener('change', sync);
    return () => q.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // `reduced` starts false and is corrected after mount, so this has to be
    // able to stop a clip that already started, not just decline to start one.
    if (reduced) {
      el.pause();
      el.currentTime = 0;
      return;
    }
    el.play().catch(() => {
      /* autoplay refused; the poster still shows the app */
    });
  }, [reduced]);

  return (
    <div className="cluster" aria-hidden="true">
      <div className="cluster-web">
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
        />
      </div>
    </div>
  );
};
