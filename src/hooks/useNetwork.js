import { useState, useEffect } from 'react';

export function useNetwork() {
  const [network, setNetwork] = useState({
    isOnline: navigator.onLine,
    effectiveType: navigator.connection?.effectiveType || 'unknown'
  });

  useEffect(() => {
    const update = () => {
      setNetwork({
        isOnline: navigator.onLine,
        effectiveType: navigator.connection?.effectiveType || 'unknown'
      });
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    navigator.connection?.addEventListener('change', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
      navigator.connection?.removeEventListener('change', update);
    };
  }, []);

  return network;
}
