'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = 'xvl48h88ru';

export function ClarityAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          Clarity.init(CLARITY_PROJECT_ID);
        });
      } else {
        setTimeout(() => {
          Clarity.init(CLARITY_PROJECT_ID);
        }, 2000);
      }
    }
  }, []);

  return null;
}
