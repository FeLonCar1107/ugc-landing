import type { ReactNode } from "react";

export default function CheckoutLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const safe = href || "#offer";
  return (
    <a
      href={safe}
      className={className}
      {...(!href ? { "aria-disabled": true } : {})}
    >
      {children}
    </a>
  );
}
