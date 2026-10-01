'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

// Le animazioni framer-motion (homepage, collections, lightbox) sono guidate
// da JavaScript e NON vengono fermate dalla regola CSS prefers-reduced-motion
// in globals.css. MotionConfig con reducedMotion="user" le disabilita per chi
// ha attivato "Riduci movimento" a livello di sistema operativo (accessibilità).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
