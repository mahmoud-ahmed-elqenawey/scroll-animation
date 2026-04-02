import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "عيادة الابتسامة المثالية | Perfect Smile Clinic",
  description:
    "ابتسامتك تبدأ من هنا - أحدث التقنيات في طب الأسنان مع فريق متخصص",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className="antialiased min-h-screen"
        style={{ fontFamily: "'Cairo', 'Inter', system-ui, sans-serif" }}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
