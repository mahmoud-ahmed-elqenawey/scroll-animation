"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "./ui/ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import("./3d/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate entire title as one unit — never split Arabic text
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power3.out" }
      );

      // Scroll-driven exit animations
      if (sectionRef.current) {
        gsap.to(titleRef.current, {
          y: -100,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(subtitleRef.current, {
          y: -60,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "70% top",
            scrub: true,
          },
        });

        if (sceneWrapperRef.current) {
          gsap.to(sceneWrapperRef.current, {
            scale: 0.3,
            opacity: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C1D] via-[#0A0A0A] to-[#0A0A0A]" />

      {/* Particles — deterministic positions to avoid hydration mismatch */}
      <div className="particle-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full animate-pulse"
            style={{
              left: `${((i * 37 + 13) % 100)}%`,
              top: `${((i * 53 + 7) % 100)}%`,
              animationDelay: `${(i * 0.17) % 5}s`,
              animationDuration: `${3 + (i * 0.13) % 4}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Scene — behind text */}
      <div ref={sceneWrapperRef} className="absolute inset-0 z-[1] opacity-70">
        <Scene />
      </div>

      {/* Content — above 3D */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pointer-events-none">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-[0_2px_30px_rgba(0,0,0,0.8)] opacity-0"
        >
          عيادة الابتسامة المثالية
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-text-secondary opacity-0"
        >
          ابتسامتك تبدأ من هنا ✨
        </p>
      </div>

      <ScrollIndicator />
    </section>
  );
}
