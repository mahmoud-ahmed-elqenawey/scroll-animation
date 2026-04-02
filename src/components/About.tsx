"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "./ui/AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slides from right (RTL)
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        }
      );

      // Card slides from left (RTL)
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        }
      );

      // Line draws across
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Horizontal line */}
        <div
          ref={lineRef}
          className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-l from-accent/50 via-accent to-accent/50 origin-right"
          style={{ transform: "scaleX(0)" }}
        />

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text content */}
          <div ref={textRef} style={{ fontFamily: "'Cairo', sans-serif" }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              مرحباً بكم في{" "}
              <span className="gradient-text">عيادتنا</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              نقدم لكم أحدث التقنيات في عالم طب الأسنان مع فريق من الأطباء
              المتخصصين الذين يحرصون على راحتكم وصحة ابتسامتكم. نؤمن بأن كل
              ابتسامة تستحق العناية المثالية.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              عيادتنا مجهزة بأحدث الأجهزة والتقنيات العالمية لضمان أفضل
              النتائج في أقل وقت ممكن وبأعلى معايير الجودة والسلامة.
            </p>
          </div>

          {/* Card */}
          <div
            ref={cardRef}
            className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-accent to-highlight" />
            <div className="space-y-6" style={{ fontFamily: "'Cairo', sans-serif" }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">رؤيتنا</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">
                أن نكون الوجهة الأولى لطب الأسنان في المنطقة، حيث نجمع بين
                التميز الطبي والراحة المطلقة لمرضانا.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20">
          <AnimatedCounter end={10} suffix="+" label="سنوات خبرة" />
          <AnimatedCounter end={5000} suffix="+" label="مريض سعيد" />
          <AnimatedCounter end={15} suffix="+" label="خدمة متخصصة" />
        </div>
      </div>
    </section>
  );
}
