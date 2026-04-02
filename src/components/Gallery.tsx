"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    id: 1,
    title: "تبييض الأسنان",
    beforeColor: "#4a3728",
    afterColor: "#f5f5f0",
  },
  {
    id: 2,
    title: "زراعة الأسنان",
    beforeColor: "#5a4a3a",
    afterColor: "#fafaf5",
  },
  {
    id: 3,
    title: "تقويم الأسنان",
    beforeColor: "#6a5a4a",
    afterColor: "#f0f0eb",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        // Reveal animation
        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px) brightness(0.3)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 40%",
              scrub: true,
            },
          }
        );

        // Clip-path reveal for the "after" side — RTL: reveal from right
        const afterEl = item.querySelector(".after-side");
        if (afterEl) {
          gsap.fromTo(
            afterEl,
            { clipPath: "inset(0 0 0 100%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 60%",
                end: "bottom 40%",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">قبل</span> و{" "}
            <span className="gradient-text">بعد</span>
          </h2>
          <p className="text-text-secondary text-lg">
            نتائج حقيقية تتحدث عن نفسها
          </p>
        </div>

        <div className="space-y-16">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="relative rounded-3xl overflow-hidden h-[300px] md:h-[400px]"
            >
              {/* Before side */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${item.beforeColor}, ${item.beforeColor}dd)`,
                }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/50"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-xl font-semibold">
                    قبل
                  </span>
                  <p className="text-white/40 mt-2">{item.title}</p>
                </div>
              </div>

              {/* After side with clip-path — starts clipped from left (RTL reveal) */}
              <div
                className="after-side absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${item.afterColor}, ${item.afterColor}ee)`,
                  clipPath: "inset(0 0 0 100%)",
                }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-xl font-semibold">
                    بعد
                  </span>
                  <p className="text-gray-500 mt-2">{item.title}</p>
                </div>
              </div>

              {/* Divider line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-accent/50 z-10 pointer-events-none" />

              {/* Label badge */}
              <div className="absolute top-4 right-4 glass px-4 py-1.5 rounded-full text-sm z-10">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
