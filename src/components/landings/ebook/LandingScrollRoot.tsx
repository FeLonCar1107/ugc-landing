"use client";

import { useEffect } from "react";

const CLASS_NAME = "launch-scroll-document";

export default function LandingScrollRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.classList.add(CLASS_NAME);
    return () => {
      document.documentElement.classList.remove(CLASS_NAME);
    };
  }, []);

  return <>{children}</>;
}
