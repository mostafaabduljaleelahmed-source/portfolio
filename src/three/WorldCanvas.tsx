import React, { useRef, useEffect, useState, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Floor } from './Floor';
import { ObsidianForms } from './ObsidianForms';
import { Architecture } from './Architecture';
import { EnergyRing } from './EnergyRing';
import { FloatingCrystals } from './FloatingCrystals';
import { Particles } from './Particles';
import { ParticleAssembly } from './ParticleAssembly';
import { Portrait } from './Portrait';
import { useUI } from '../context/UIContext';
import { useAudio } from '../context/AudioContext';

/**
 * The 3D scene is a backdrop for the hero only.
 *
 * It fades out over the first viewport of scrolling and stops rendering once it
 * is invisible, so the rest of the page is read against a flat surface instead
 * of moving geometry, and phones/laptops are not asked to animate a scene no
 * one is looking at. Small screens and reduced-motion users never load it.
 */

const FADE_START = 0.15; // fraction of viewport height where the fade begins
const FADE_END = 0.85;   // fully faded out by here

interface CameraProps {
  progress: React.MutableRefObject<number>;
}

const CinemaCameraRig: React.FC<CameraProps> = ({ progress }) => {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current;

    const noiseX = Math.sin(t * 0.45) * 0.08 + state.pointer.x * 0.35;
    const noiseY = Math.cos(t * 0.35) * 0.06 + state.pointer.y * 0.25;

    const targetZ = 11.2 + Math.sin(p * Math.PI) * 2.8 - p * 0.6;
    const targetY = 0.08 + p * 0.6;

    const targetPos = new THREE.Vector3(noiseX, noiseY + targetY, targetZ);
    state.camera.position.lerp(targetPos, 0.035);

    const lookTarget = new THREE.Vector3(0.28 + state.pointer.x * 0.15, -0.08 + p * 0.25, 0);
    state.camera.lookAt(lookTarget);
  });

  return null;
};

interface SceneProps {
  progress: React.MutableRefObject<number>;
  themeColor: string;
  isDiscovered: boolean;
  isActive: boolean;
  onRingClick: () => void;
  onCrystalClick: () => void;
}

const Scene: React.FC<SceneProps> = ({ progress, themeColor, isDiscovered, isActive, onRingClick, onCrystalClick }) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={isActive ? 'always' : 'never'}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 28, position: [0, 0, 11.2] }}
      onCreated={({ scene, gl }) => {
        scene.fog = new THREE.FogExp2('#080b12', 0.065);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}
    >
      <ambientLight intensity={isDiscovered ? 0.5 : 0.2} color="#7897b5" />
      <directionalLight position={[6, 8, 6]} intensity={isDiscovered ? 1.8 : 0.4} color="#fff4e6" />
      <pointLight position={[-6, 5, 2]} intensity={isDiscovered ? 24 : 6} color={themeColor} distance={14} />
      <pointLight position={[5, -2, 2]} intensity={isDiscovered ? 15 : 3} color="#e89a61" distance={11} />

      <Floor />
      <ObsidianForms />
      <Architecture progress={progress} themeColor={themeColor} />
      <EnergyRing progress={progress} onRingClick={onRingClick} />
      <FloatingCrystals onCrystalClick={onCrystalClick} />
      <Particles progress={progress} />
      <ParticleAssembly progress={progress} isDiscovered={isDiscovered} />

      <Suspense fallback={null}>
        <Portrait progress={progress} themeColor={themeColor} isDiscovered={isDiscovered} />
      </Suspense>

      <CinemaCameraRig progress={progress} />
    </Canvas>
  );
};

/** True when this device should not run the 3D scene at all. */
function shouldSkipScene(): boolean {
  if (typeof window === 'undefined') return true;
  const coarse = window.matchMedia('(max-width: 900px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return coarse || reduced;
}

export const WorldCanvas: React.FC = () => {
  const { showToast } = useUI();
  const { playCrystal, playTheme } = useAudio();
  const progress = useRef<number>(0);
  const [themeIndex, setThemeIndex] = useState<number>(0);
  const [isDiscovered, setIsDiscovered] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(1);
  const [skip, setSkip] = useState<boolean>(shouldSkipScene);
  const themes = ['#88d9ff', '#e89a61', '#38ef7d', '#b967ff', '#ffffff'];

  // Lighting "discovery" is a visual flourish — it no longer fires a toast,
  // which used to pop over the content on every first scroll.
  const triggerDiscovery = useCallback(() => setIsDiscovered(true), []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia('(max-width: 900px)');
    const sync = () => setSkip(shouldSkipScene());
    motionQuery.addEventListener('change', sync);
    widthQuery.addEventListener('change', sync);
    return () => {
      motionQuery.removeEventListener('change', sync);
      widthQuery.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (skip) return;

    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const vh = Math.max(1, window.innerHeight);
        const scrolled = window.scrollY / vh;

        // Drives the camera rig, unchanged: 0 at the top, 1 at the page bottom.
        progress.current = Math.min(
          1,
          window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)
        );

        const faded = (scrolled - FADE_START) / (FADE_END - FADE_START);
        setOpacity(Math.max(0, Math.min(1, 1 - faded)));

        if (scrolled > 0.02) triggerDiscovery();
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', triggerDiscovery, { once: true });
    window.addEventListener('discover-architect', triggerDiscovery);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', triggerDiscovery);
      window.removeEventListener('discover-architect', triggerDiscovery);
    };
  }, [skip, triggerDiscovery]);

  const cycleTheme = () => {
    triggerDiscovery();
    const next = (themeIndex + 1) % themes.length;
    setThemeIndex(next);
    document.documentElement.style.setProperty('--theme-color', themes[next]);
    playTheme();
    showToast('LIGHTING THEME', `Active hue: ${themes[next]}`);
  };

  const triggerQuote = () => {
    triggerDiscovery();
    const quotes = [
      '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
      '"First, solve the problem. Then, write the code." — John Johnson',
      '"Make it work, make it right, make it fast." — Kent Beck'
    ];
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    playCrystal();
    showToast('ENGINEERING WISDOM', q);
  };

  // Phones and reduced-motion visitors get a static backdrop instead: same
  // palette, none of the GPU cost.
  if (skip) {
    return <div className="world-static-backdrop" aria-hidden="true" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.035 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          // No transition: the value is already driven frame-by-frame by scroll.
          pointerEvents: opacity < 0.15 ? 'none' : 'auto'
        }}
      >
        <Scene
          progress={progress}
          themeColor={themes[themeIndex]}
          isDiscovered={isDiscovered}
          isActive={opacity > 0.01}
          onRingClick={cycleTheme}
          onCrystalClick={triggerQuote}
        />
      </div>
    </motion.div>
  );
};
