"use client";

import { ReactNode } from "react";

interface GlassmorphCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassmorphCard({
  children,
  className = "",
  hover = true,
}: GlassmorphCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-6 transition-all duration-500 ${
        hover
          ? "hover:-translate-y-2 hover:shadow-[0_8px_32px_rgba(0,212,170,0.15)] hover:border-accent/30"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
