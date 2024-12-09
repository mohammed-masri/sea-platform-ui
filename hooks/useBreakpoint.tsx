import { useState, useEffect } from "react";

type Breakpoints = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoints>("xs");

  useEffect(() => {
    let resizeTimeout: any = undefined;

    function handleResize() {
      // Clear the previous timeout
      clearTimeout(resizeTimeout);

      // Set a new timeout
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        if (width >= 1536) setBreakpoint("2xl"); // Tailwind `2xl`
        else if (width >= 1280) setBreakpoint("xl"); // Tailwind `xl`
        else if (width >= 1024) setBreakpoint("lg"); // Tailwind `lg`
        else if (width >= 768) setBreakpoint("md"); // Tailwind `md`
        else if (width >= 640) setBreakpoint("sm"); // Tailwind `sm`
        else setBreakpoint("xs"); // Custom `xs` for <640px
      }, 100); // Delay in ms (adjust as needed)
    }

    // Set initial breakpoint
    handleResize();

    // Attach the debounced resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
}

export default useBreakpoint;
