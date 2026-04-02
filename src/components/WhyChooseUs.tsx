"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Users, Armchair, BadgeDollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Cpu,
    title: "أحدث التقنيات",
    description: "نستخدم أحدث الأجهزة والتقنيات العالمية في جميع علاجاتنا",
    direction: { x: -100, y: -50 },
  },
  {
    icon: Users,
    title: "فريق متخصص",
    description: "فريق من الأطباء المتخصصين ذوي الخبرة العالية والكفاءة",
    direction: { x: 100, y: -50 },
  },
  {
    icon: Armchair,
    title: "بيئة مريحة",
    description: "بيئة عيادة مصممة لراحتكم النفسية والجسدية أثناء العلاج",
    direction: { x: -100, y: 50 },
  },
  {
    icon: BadgeDollarSign,
    title: "أسعار تنافسية",
    description: "أسعار مدروسة تناسب الجميع مع خطط تقسيط مرنة",
    direction: { x: 100, y: 50 },
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Multi-layer parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (midRef.current) {
        gsap.to(midRef.current, {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Feature cards float in
      const featureEls = sectionRef.current?.querySelectorAll(".feature-card");
      featureEls?.forEach((el, i) => {
        const feat = features[i];
        gsap.fromTo(
          el,
          { opacity: 0, x: feat.direction.x, y: feat.direction.y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 px-4 md:px-8 overflow-hidden"
    >
      {/* Parallax background layers */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 20% 50%, #00D4AA15 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C9A96E15 0%, transparent 50%)",
        }}
      />
      <div
        ref={midRef}
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 60% 30%, #00D4AA20 0%, transparent 40%)",
        }}
      />
      <div ref={fgRef} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent/10 rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            لماذا <span className="gradient-text">تختارنا</span>؟
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            نتميز بتقديم أفضل الخدمات الطبية في بيئة مريحة وبأسعار تنافسية
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="feature-card glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/20 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0 relative">
                    <Icon className="w-8 h-8 text-accent relative z-10" />
                    {/* Pulse glow */}
                    <div className="absolute inset-0 rounded-2xl bg-accent/5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
