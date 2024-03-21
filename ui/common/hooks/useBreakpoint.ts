import { useEffect, useState } from 'react';

// Import constants and types
import { BREAKPOINTS } from '../constants';
import { BreakpointTypes } from '../types';

// Custom hook to track the current breakpoint based on window width
const useBreakpoint = () => {
  const [breakpoint, setBreakPoint] = useState<BreakpointTypes | undefined>();

  // Effect to run on component mount and handle window resize
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newBreakpoint: BreakpointTypes | undefined;

      if (windowWidth < 360) {
        newBreakpoint = 'xxs';
      } else if (windowWidth >= 360 && windowWidth < 480) {
        newBreakpoint = 'xs';
      } else if (windowWidth >= 480 && windowWidth < 640) {
        newBreakpoint = 'sm';
      } else if (windowWidth >= 640 && windowWidth < 768) {
        newBreakpoint = 'md';
      } else if (windowWidth >= 768 && windowWidth < 1024) {
        newBreakpoint = 'lg';
      } else if (windowWidth >= 1024 && windowWidth < 1280) {
        newBreakpoint = 'xl';
      } else if (windowWidth >= 1280) {
        newBreakpoint = '2xl';
      }

      setBreakPoint(newBreakpoint);
    };

    // Attach the event listener and call handleResize to set initial breakpoint
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
