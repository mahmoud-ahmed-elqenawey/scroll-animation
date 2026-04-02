"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const Gallery = dynamic(() => import("@/components/Gallery"), { ssr: false });
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});
const Booking = dynamic(() => import("@/components/Booking"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-primary-bg min-h-screen">
      <Hero />
      <About />
      <Services />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <Booking />
      <Contact />
      <Footer />
    </main>
  );
}
