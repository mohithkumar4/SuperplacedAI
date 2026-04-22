'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

type CountUpProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

export default function CountUp({ end, duration = 2, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
  });
  const roundedValue = useTransform(springValue, (latest) => Math.round(latest));

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const unsubscribe = roundedValue.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      unsubscribe();
    };
  }, [roundedValue]);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, end, {
      duration,
      ease: 'easeOut',
    });

    return () => {
      controls.stop();
    };
  }, [duration, end, isInView, motionValue]);

  return <span ref={ref}>{`${displayValue}${suffix}`}</span>;
}
