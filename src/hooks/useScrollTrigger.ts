"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollTrigger() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          sectionRef.current &&
          st.trigger &&
          sectionRef.current.contains(st.trigger as Node)
        ) {
          st.kill();
        }
      });
    };
  }, []);

  return sectionRef;
}

export function useGSAP(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = [],
  scope?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
