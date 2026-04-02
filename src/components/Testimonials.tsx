"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "أحمد محمد",
    text: "تجربة رائعة! الدكتور كان محترف جداً والنتيجة فاقت توقعاتي. أنصح الجميع بزيارة العيادة.",
    rating: 5,
    service: "زراعة الأسنان",
  },
  {
    name: "فاطمة علي",
    text: "عيادة ممتازة ونظيفة جداً. الطاقم كله ودود ومتعاون. تبييض أسناني أصبح مذهلاً!",
    rating: 5,
    service: "تبييض الأسنان",
  },
  {
    name: "محمد سعيد",
    text: "أفضل عيادة أسنان زرتها. التقويم الشفاف غير ابتسامتي تماماً وبدون أي إزعاج.",
    rating: 5,
    service: "تقويم الأسنان",
  },
  {
    name: "نورة خالد",
    text: "كنت أخاف من طبيب الأسنان لكن هنا شعرت بالراحة التامة. شكراً لكم على العناية الرائعة!",
    rating: 4,
    service: "علاج العصب",
  },
  {
    name: "عبدالله حسن",
    text: "خدمة ممتازة وأسعار معقولة. النتيجة كانت مبهرة والدكتور شرح كل خطوة بالتفصيل.",
    rating: 5,
    service: "حشوات تجميلية",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards animate in with 3D rotation
      const cards = sectionRef.current?.querySelectorAll(".testimonial-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, rotateY: 90, transformPerspective: 1000 },
          {
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stars sparkle animation
      const stars = sectionRef.current?.querySelectorAll(".star-icon");
      stars?.forEach((star, i) => {
        gsap.fromTo(
          star,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            delay: 0.8 + i * 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (!carouselRef.current || isPaused) return;

    const carousel = carouselRef.current;
    let animFrame: number;
    let scrollPos = 0;
    const speed = 0.5;

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= carousel.scrollWidth / 2) {
        scrollPos = 0;
      }
      carousel.scrollLeft = scrollPos;
      animFrame = requestAnimationFrame(scroll);
    };

    animFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animFrame);
  }, [isPaused]);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Subtle moving gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(135deg, #141428 0%, #0C0C1D 50%, #141428 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto z-10">
        <div className="text-center mb-16" style={{ fontFamily: "'Cairo', sans-serif" }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            ماذا يقول <span className="gradient-text">مرضانا</span>
          </h2>
          <p className="text-text-secondary text-lg">
            آراء حقيقية من مرضانا الكرام
          </p>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Duplicate for infinite scroll */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card min-w-[320px] md:min-w-[380px] flex-shrink-0"
            >
              <div className="glass rounded-2xl p-6 md:p-8 h-full relative" style={{ fontFamily: "'Cairo', sans-serif" }}>
                <Quote className="w-8 h-8 text-accent/20 absolute top-4 left-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`star-icon w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-highlight fill-highlight"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-text-secondary text-xs">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
