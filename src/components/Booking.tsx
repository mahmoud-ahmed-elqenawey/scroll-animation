"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circle expand reveal
      if (circleRef.current) {
        gsap.fromTo(
          circleRef.current,
          { scale: 0, borderRadius: "50%" },
          {
            scale: 1,
            borderRadius: "0%",
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      }

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form fields slide up one by one
      const fields = fieldsRef.current?.querySelectorAll(".form-field");
      fields?.forEach((field, i) => {
        gsap.fromTo(
          field,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
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
      className="relative py-24 md:py-32 px-4 md:px-8 min-h-screen flex items-center overflow-hidden"
    >
      {/* Expanding circle background */}
      <div
        ref={circleRef}
        className="absolute inset-0 bg-gradient-to-b from-secondary-bg to-[#0e0e24]"
        style={{ transformOrigin: "center center" }}
      />

      <div ref={contentRef} className="relative max-w-4xl mx-auto w-full z-10">
        <div className="text-center mb-12" style={{ fontFamily: "'Cairo', sans-serif" }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            احجز <span className="gradient-text">موعدك</span> الآن
          </h2>
          <p className="text-text-secondary text-lg">
            نحن هنا لخدمتك — احجز موعدك بسهولة
          </p>
        </div>

        <div
          ref={fieldsRef}
          className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          <div className="space-y-6">
            <div className="form-field">
              <label className="block text-sm text-text-secondary mb-2">
                الاسم الكامل
              </label>
              <input
                type="text"
                placeholder="أدخل اسمك الكامل"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            <div className="form-field">
              <label className="block text-sm text-text-secondary mb-2">
                رقم الهاتف
              </label>
              <input
                type="tel"
                placeholder="05xxxxxxxx"
                dir="ltr"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-accent/50 transition-colors text-left"
              />
            </div>

            <div className="form-field">
              <label className="block text-sm text-text-secondary mb-2">
                الخدمة المطلوبة
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                <option value="" className="bg-[#141428]">
                  اختر الخدمة
                </option>
                <option value="whitening" className="bg-[#141428]">
                  تبييض الأسنان
                </option>
                <option value="implants" className="bg-[#141428]">
                  زراعة الأسنان
                </option>
                <option value="orthodontics" className="bg-[#141428]">
                  تقويم الأسنان
                </option>
                <option value="fillings" className="bg-[#141428]">
                  حشوات تجميلية
                </option>
                <option value="root-canal" className="bg-[#141428]">
                  علاج العصب
                </option>
                <option value="cleaning" className="bg-[#141428]">
                  تنظيف الأسنان
                </option>
              </select>
            </div>

            <div className="form-field">
              <label className="block text-sm text-text-secondary mb-2">
                التاريخ المفضل
              </label>
              <input
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            <div className="form-field pt-2">
              <button className="glow-button w-full py-4 rounded-xl text-white font-bold text-lg">
                احجز الآن
              </button>
            </div>
          </div>

          {/* Quick contact */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10">
            <a
              href="tel:+966500000000"
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>اتصل بنا</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://wa.me/966500000000"
              className="flex items-center gap-2 text-text-secondary hover:text-green-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
