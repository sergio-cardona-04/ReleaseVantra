import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-motion';
import { Button } from '@/components/ui/button';

const GradientASCII = lazy(() => import('./gradient-ascii'));
const TechText = lazy(() => import('./tech-text'));
const TextType = lazy(() => import('./text-type'));
const subtitles = [
  'Controla cada versión.',
  'Aprueba cambios con confianza.',
  'Ejecuta GitHub Actions con control.',
  'Cada despliegue, con trazabilidad.',
];

export function HeroEffects() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const staticMode = reduced || paused || !visible;
  return (
    <div ref={ref} className="hero-effects">
      <div className="hero-background" aria-hidden="true">
        <div className="ascii-static">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i}>{' . : + * # @ + : . '.repeat(12)}</div>
          ))}
        </div>
        {!staticMode && (
          <Suspense fallback={null}>
            <GradientASCII
              colors={['#222222', '#555555', '#93C5FD', '#F3F4F6']}
              shape="horizon"
              characters=" .:+*#@"
              cellSize={20}
              density={0.55}
              glyphOpacity={0.65}
              gradientOpacity={0.55}
              glow={0.12}
              flicker={0.08}
              flow={0.25}
              speed={0.35}
              mouseInteraction={false}
              clickEffect="none"
              dpr={1}
            />
          </Suspense>
        )}
      </div>
      <div className="hero-wordmark">
        <h1>ReleaseVantra</h1>
        {!staticMode && (
          <Suspense fallback={null}>
            <div className="tech-layer" aria-hidden="true">
              <TechText
                text="ReleaseVantra"
                fontSize={144}
                fontWeight={600}
                align="left"
                intro="metrics"
                introDuration={1.6}
                reveal="letter"
                draggable={false}
                clickKick={false}
                labels={false}
                guides={false}
                specks={4}
                sweep={false}
                color="#FFFFFF"
                accentColor="#93C5FD"
              />
            </div>
          </Suspense>
        )}
      </div>
      <div className="hero-subtitle">
        {staticMode ? (
          <span>{subtitles[0]}</span>
        ) : (
          <Suspense fallback={<span>{subtitles[0]}</span>}>
            <TextType
              text={subtitles}
              typingSpeed={55}
              pauseDuration={2200}
              deletingSpeed={35}
              typeEffect="fade"
              cursorStyle="bar"
              mistakes={0}
            />
          </Suspense>
        )}
      </div>
      {!reduced && (
        <Button
          className="motion-toggle"
          variant="ghost"
          size="sm"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? 'Reanudar animaciones' : 'Pausar animaciones'}
        </Button>
      )}
    </div>
  );
}
