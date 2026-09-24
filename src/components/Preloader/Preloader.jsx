import React, { useEffect, useRef, useState } from 'react';
import './Preloader.css';

// Classic chess coordinates and Japanese craft accents matching moneyincheck.org
const CHESS_MOVES = [
  'e4', 'e5', 'Nf3', 'Nc6', 'O-O', 'd4', 'd6', 'a4', 'h6', 
  'Bc4', 'Nf6', 'd3', 'Qxd8', 'c5', 'ものづくり', 'Bb5'
];

// Left & right positional coordinates (in rem) relative to the central character
const LEFT_OFFSETS = [
  [-8.8, -13.5],
  [-11.2, -2.5],
  [-7.8, 12.5],
  [-14.2, -7.5],
  [-11.8, 6.8],
  [-5.2, -17.2],
];

const RIGHT_OFFSETS = [
  [6.2, -12.4],
  [13.8, 1.4],
  [8.2, 13.2],
  [13.2, -7.8],
  [5.2, 16.5],
  [14.8, -14.2],
];

const ROTATIONS = [11.5, -5.2, 7.8, -6.5, 4.8, -8.2, 3.6];
const OPACITY_DECAY = [1, 0.85, 0.58, 0.38, 0.2];

const Preloader = ({ onComplete }) => {
  // Phases: 'active' -> 'exiting-content' -> 'curtain-up' -> 'done'
  const [phase, setPhase] = useState('active');
  const [progress, setProgress] = useState(0);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const movesQueue = useRef([]);
  const countRef = useRef(0);
  const leftIdxRef = useRef(0);
  const rightIdxRef = useRef(0);

  useEffect(() => {
    // 1. Lock document scrolling during preloader
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const video = videoRef.current;
    const canvas = canvasRef.current;
    let renderRafId;

    // 2. Real-time Canvas Rendering with Chroma/Luminance Background Stripping
    // This completely removes the video's solid gray background and ensures 100% transparent alpha
    const renderFrame = () => {
      if (video && canvas && !video.paused && !video.ended) {
        const width = video.videoWidth || 320;
        const height = video.videoHeight || 480;

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height);
          try {
            const frame = ctx.getImageData(0, 0, width, height);
            const data = frame.data;
            const len = data.length;
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';

            for (let i = 0; i < len; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              // Standard perceptual luminance formula
              const lum = 0.299 * r + 0.587 * g + 0.114 * b;

              // Thresholds: video background is off-white (~230)
              // Line strokes are dark (~0 to ~110)
              if (lum > 185) {
                // Completely transparent! No background box.
                data[i + 3] = 0;
              } else {
                // Anti-aliased edge smoothing for line art
                let alpha = 1;
                if (lum > 115) {
                  alpha = 1 - (lum - 115) / (185 - 115);
                }
                data[i + 3] = Math.round(alpha * 255);

                if (isLight) {
                  // Deep Sumi ink in light theme
                  data[i] = 5;
                  data[i + 1] = 5;
                  data[i + 2] = 8;
                } else {
                  // Luminous crisp white chalk in dark theme
                  data[i] = 255;
                  data[i + 1] = 255;
                  data[i + 2] = 255;
                }
              }
            }
            ctx.putImageData(frame, 0, 0);
            setIsCanvasReady(true);
          } catch (e) {
            // Fallback if context extraction blocked
          }
        }
      }
      renderRafId = requestAnimationFrame(renderFrame);
    };

    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      renderRafId = requestAnimationFrame(renderFrame);
    }

    // 3. Smooth Progress ticker (0% -> 100% over ~2.2s)
    const progressStart = performance.now();
    const duration = 2200; // ms
    let animFrameId;

    const updateProgress = (now) => {
      const elapsed = now - progressStart;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animFrameId = requestAnimationFrame(updateProgress);
      }
    };
    animFrameId = requestAnimationFrame(updateProgress);

    // 4. Floating chess notation spawner loop (every 175ms)
    let isExiting = false;
    const spawnMove = () => {
      if (!stageRef.current || isExiting) return;

      const isEven = countRef.current % 2 === 0;
      const offsets = isEven ? LEFT_OFFSETS : RIGHT_OFFSETS;
      const index = isEven ? leftIdxRef.current++ : rightIdxRef.current++;
      const [mx, my] = offsets[index % offsets.length];
      const mr = ROTATIONS[countRef.current % ROTATIONS.length];
      const text = CHESS_MOVES[countRef.current % CHESS_MOVES.length];

      let accentClass = '';
      if (text === 'O-O' || text === 'ものづくり') accentClass = ' accent-gold';
      else if (text === 'd4' || text === 'e4') accentClass = ' accent-crimson';
      else if (text === 'Nf3' || text === 'Nc6') accentClass = ' accent-jade';

      const moveEl = document.createElement('span');
      moveEl.className = `preloader__move${accentClass}`;
      moveEl.textContent = text;
      moveEl.style.setProperty('--mx', `${mx}rem`);
      moveEl.style.setProperty('--my', `${my}rem`);
      moveEl.style.setProperty('--mr', `${mr}deg`);

      stageRef.current.appendChild(moveEl);
      countRef.current++;

      movesQueue.current.unshift(moveEl);
      movesQueue.current.forEach((el, idx) => {
        if (idx < OPACITY_DECAY.length) {
          el.style.setProperty('--mo', OPACITY_DECAY[idx]);
        }
      });

      if (movesQueue.current.length > OPACITY_DECAY.length) {
        const oldest = movesQueue.current.pop();
        if (oldest) {
          oldest.classList.add('is-out');
          setTimeout(() => {
            if (oldest.parentNode) oldest.remove();
          }, 350);
        }
      }

      requestAnimationFrame(() => {
        moveEl.classList.add('is-in');
      });
    };

    spawnMove();
    const spawnTimer = setInterval(spawnMove, 175);

    // 5. Orchestrated Smooth Multi-Phase Transition:
    // Phase A: At duration, content gently dissolves out
    const contentExitTimer = setTimeout(() => {
      isExiting = true;
      clearInterval(spawnTimer);
      setPhase('exiting-content');

      // Phase B: Theater curtain smoothly lifts upward, unveiling the website
      const curtainTimer = setTimeout(() => {
        setPhase('curtain-up');

        // Phase C: Transition complete -> release scroll & recalibrate GSAP ScrollTrigger
        const doneTimer = setTimeout(() => {
          setPhase('done');
          document.body.style.overflow = prevOverflow;
          onComplete?.();
        }, 820);

        return () => clearTimeout(doneTimer);
      }, 350);

      return () => clearTimeout(curtainTimer);
    }, duration);

    return () => {
      clearInterval(spawnTimer);
      clearTimeout(contentExitTimer);
      cancelAnimationFrame(animFrameId);
      cancelAnimationFrame(renderRafId);
      document.body.style.overflow = prevOverflow;
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div 
      className={`portfolio-preloader phase-${phase}`}
      aria-hidden="true"
    >
      {/* ── Chess / Matrix Grid Background ── */}
      <div className="preloader__grid" />

      {/* ── Top HUD Status ── */}
      <div className="preloader__hud-top">
        <span className="preloader__hud-dot" />
        <span>システム準備中 // LOADING SYSTEM</span>
      </div>

      {/* ── Centered Stage with Character & Dynamic Moves ── */}
      <div className="preloader__stage" ref={stageRef}>
        {/* Hidden video source stream */}
        <video 
          ref={videoRef}
          src="/loading.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ display: 'none' }}
        />
        
        {/* Rendered transparent alpha canvas */}
        <canvas 
          ref={canvasRef}
          className={`preloader__canvas ${isCanvasReady ? 'is-ready' : ''}`}
        />
      </div>

      {/* ── Bottom HUD Metrics & Progress ── */}
      <div className="preloader__hud-bottom">
        <span>INITIALIZING</span>
        <span className="preloader__hud-progress">[{progress}%]</span>
      </div>
    </div>
  );
};

export default Preloader;
