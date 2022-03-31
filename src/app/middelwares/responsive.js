import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width_page, innerHeight: height_page } = window;
  return {
    width_page,
    height_page
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}