"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  MessageCircle,
  Share2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: "العنوان",
    detail: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
  },
  {
    icon: Phone,
    title: "الهاتف",
    detail: "+966 50 000 0000",
    dir: "ltr" as const,
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    detail: "info@perfectsmile.sa",
    dir: "ltr" as const,
  },
];

const workingHours = [
  { day: "السبت - الخميس", hours: "9:00 ص - 9:00 م" },
  { day: "الجمعة", hours: "4:00 م - 9:00 م" },
];

const socials = [
  { icon: Globe, label: "Instagram", color: "hover:text-pink-400" },
  { icon: MessageCircle, label: "Twitter", color: "hover:text-sky-400" },
  { icon: Share2, label: "Facebook", color: "hover:text-blue-400" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".contact-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
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

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 md:px-8"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">تواصل</span> معنا
          </h2>
          <p className="text-text-secondary text-lg">
            نسعد بخدمتك في أي وقت
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div className="contact-card glass rounded-3xl overflow-hidden h-[300px] md:h-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-highlight/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="text-text-secondary text-lg">موقعنا على الخريطة</p>
                <p className="text-text-secondary/50 text-sm mt-2">
                  شارع الملك فهد، الرياض
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact cards */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="contact-card glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:border-accent/20"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">{info.title}</p>
                    <p
                      className="font-medium"
                      dir={info.dir || "rtl"}
                    >
                      {info.detail}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Working hours */}
            <div className="contact-card glass rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-highlight" />
                </div>
                <p className="font-semibold">ساعات العمل</p>
              </div>
              <div className="space-y-3 mr-15">
                {workingHours.map((wh, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-text-secondary">{wh.day}</span>
                    <span className="text-accent font-medium">{wh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social media */}
            <div className="contact-card flex items-center justify-center gap-4 pt-4">
              {socials.map((social, i) => {
                const Icon = social.icon;
                return (
                  <button
                    key={i}
                    className={`w-12 h-12 glass rounded-xl flex items-center justify-center text-text-secondary transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
