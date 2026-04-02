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
      // Text fades up
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Card fades up with delay
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
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
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Horizontal line */}
        <div
          ref={lineRef}
          className="hidden md:block absolute top-1/3 left-0 right-0 h-px bg-gradient-to-l from-accent/50 via-accent to-accent/50 origin-right z-0"
          style={{ transform: "scaleX(0)" }}
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Text content */}
          <div ref={textRef}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              مرحباً بكم في{" "}
              <span className="gradient-text">عيادتنا</span>
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
              نقدم لكم أحدث التقنيات في عالم طب الأسنان مع فريق من الأطباء
              المتخصصين الذين يحرصون على راحتكم وصحة ابتسامتكم. نؤمن بأن كل
              ابتسامة تستحق العناية المثالية.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              عيادتنا مجهزة بأحدث الأجهزة والتقنيات العالمية لضمان أفضل
              النتائج في أقل وقت ممكن وبأعلى معايير الجودة والسلامة.
            </p>
          </div>

          {/* Card */}
          <div
            ref={cardRef}
            className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-accent to-highlight" />
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
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
        <div className="relative z-10 grid grid-cols-3 gap-8 mt-20 pt-8 border-t border-white/5">
          <AnimatedCounter end={10} suffix="+" label="سنوات خبرة" />
          <AnimatedCounter end={5000} suffix="+" label="مريض سعيد" />
          <AnimatedCounter end={15} suffix="+" label="خدمة متخصصة" />
        </div>
      </div>
    </section>
  );
}
