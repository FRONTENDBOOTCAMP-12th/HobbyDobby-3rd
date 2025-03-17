import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Title({ children }: { children: string }) {
  const location = useLocation();
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    setFullUrl(`${window.location.origin}${location.pathname}`);
  }, [location]);

  return (
    <>
      <title>{`${children} | ${import.meta.env.VITE_SERVICE_NAME}`}</title>
      <meta
        property="og:title"
        content={`${children} | ${import.meta.env.VITE_SERVICE_NAME}`}
      />
      <meta
        property="og:description"
        content={`${import.meta.env.VITE_SERVICE_NAME}의 ${children}`}
      />
      <meta property="og:image" content="/assets/meta-logo.svg" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta
        name="twitter:card"
        content={`${import.meta.env.VITE_SERVICE_NAME}의 ${children}`}
      />
    </>
  );
}

export default Title;
