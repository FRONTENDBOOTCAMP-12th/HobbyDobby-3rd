import { useMemo } from 'react';

export function useFilteredClassName(className = '') {
  return useMemo(() => {
    return Array.from(new Set(className.trim().split(/\s+/))).join(' ');
  }, [className]);
}
