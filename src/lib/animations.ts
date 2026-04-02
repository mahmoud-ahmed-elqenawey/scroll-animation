import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function fadeInUp(
  element: string | Element,
  trigger?: string | Element,
  options?: { delay?: number; duration?: number; y?: number; scrub?: boolean }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: options?.y ?? 60 },
    {
      opacity: 1,
      y: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger,
            start: "top 80%",
            end: "top 20%",
            scrub: options?.scrub ?? false,
            toggleActions: "play none none reverse",
          }
        : undefined,
    }
  );
}

export function fadeInLeft(
  element: string | Element,
  trigger?: string | Element,
  options?: { delay?: number; duration?: number; x?: number }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: options?.x ?? -80 },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        : undefined,
    }
  );
}

export function fadeInRight(
  element: string | Element,
  trigger?: string | Element,
  options?: { delay?: number; duration?: number; x?: number }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, x: options?.x ?? 80 },
    {
      opacity: 1,
      x: 0,
      duration: options?.duration ?? 1,
      delay: options?.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: trigger
        ? {
            trigger,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        : undefined,
    }
  );
}

export function staggerReveal(
  elements: string | Element[],
  trigger: string | Element,
  options?: { stagger?: number; y?: number }
) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: options?.y ?? 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: options?.stagger ?? 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
}

export function drawLine(
  element: string | Element,
  trigger: string | Element
) {
  return gsap.fromTo(
    element,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    }
  );
}

export function parallax(
  element: string | Element,
  trigger: string | Element,
  speed: number = 0.5
) {
  return gsap.to(element, {
    y: () => speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
