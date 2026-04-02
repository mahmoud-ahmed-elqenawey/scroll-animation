"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassmorphCard from "./ui/GlassmorphCard";
import {
  Sparkles,
  CircleDot,
  AlignVerticalSpaceAround,
  Palette,
  HeartPulse,
  Droplets,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Sparkles,
    title: "تبييض الأسنان",
    description:
      "تقنيات تبييض متقدمة لابتسامة مشرقة وطبيعية باستخدام أحدث الأجهزة العالمية",
  },
  {
    icon: CircleDot,
    title: "زراعة الأسنان",
    description:
      "زراعة أسنان بأعلى معايير الجودة مع ضمان طويل الأمد ونتائج طبيعية",
  },
  {
    icon: AlignVerticalSpaceAround,
    title: "تقويم الأسنان",
    description:
      "تقويم شفاف ومعدني لتصحيح اصطفاف الأسنان بأحدث التقنيات",
  },
  {
    icon: Palette,
    title: "حشوات تجميلية",
    description:
      "حشوات بلون الأسنان الطبيعي لاستعادة جمال ووظيفة الأسنان",
  },
  {
    icon: HeartPulse,
    title: "علاج العصب",
    description:
      "علاج جذور الأسنان بدقة عالية وبدون ألم باستخدام تقنيات حديثة",
  },
  {
    icon: Droplets,
    title: "تنظيف الأسنان",
    description:
      "تنظيف احترافي عميق لإزالة الجير والبقع والحفاظ على صحة اللثة",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Calculate how far to scroll: total cards width minus viewport
      const totalScroll = track.scrollWidth - window.innerWidth + 100;

      gsap.to(track, {
        // In RTL, we need positive x to scroll "left" (which is forward in RTL)
        x: () => totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      const cards = track.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-0 md:h-screen overflow-hidden"
    >
      <div className="h-full flex flex-col justify-center">
        {/* Title - always visible */}
        <div className="px-6 md:px-16 mb-10 md:mb-0 md:absolute md:top-[12%] md:right-8 z-10">
          <h2
            className="text-3xl md:text-5xl font-bold mb-3"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            <span className="gradient-text">خدماتنا</span> المتخصصة
          </h2>
          <p
            className="text-text-secondary text-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            نقدم مجموعة شاملة من خدمات طب الأسنان
          </p>
        </div>

        {/* Cards track */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-16 md:mt-16"
          dir="ltr"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card md:min-w-[340px] md:w-[340px] flex-shrink-0"
                dir="rtl"
              >
                <GlassmorphCard className="h-full group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {service.description}
                  </p>
                </GlassmorphCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
