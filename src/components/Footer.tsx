"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax footer reveal — previous section slides up to reveal footer
      if (wrapperRef.current) {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            if (footerRef.current) {
              footerRef.current.style.opacity = String(
                Math.min(1, self.progress * 2)
              );
            }
          },
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <footer
        ref={footerRef}
        className="relative bg-[#050510] py-12 px-4 md:px-8"
             >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-l from-transparent via-accent/50 to-transparent" />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-3 gradient-text">
                عيادة الابتسامة المثالية
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                ابتسامتك تبدأ من هنا — نقدم أفضل خدمات طب الأسنان بأحدث
                التقنيات العالمية.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold mb-3 text-white/80">روابط سريعة</h4>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    خدماتنا
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    احجز موعد
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    تواصل معنا
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-white/80">تواصل معنا</h4>
              <div className="space-y-2 text-text-secondary text-sm">
                <p>شارع الملك فهد، الرياض</p>
                <p dir="ltr" className="text-left md:text-right">
                  +966 50 000 0000
                </p>
                <p dir="ltr" className="text-left md:text-right">
                  info@perfectsmile.sa
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-secondary text-xs">
              © 2024 عيادة الابتسامة المثالية. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              {["Instagram", "Twitter", "Facebook"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-text-secondary hover:text-accent transition-colors text-xs"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
