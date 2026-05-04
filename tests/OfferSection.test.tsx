import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Languages from "@/enums/languages.enum";
import type { EbookLandingCopy } from "@/types/ebook-landing";
import es from "@/dictionaries/landings/discover-your-character/es.json";
import OfferSection from "@/components/landings/ebook/offer/OfferSection";
import UrgencyBlock from "@/components/landings/ebook/offer/UrgencyBlock";

describe("OfferSection", () => {
  const offer = es.offer as EbookLandingCopy["offer"];

  afterEach(() => {
    cleanup();
  });

  it("keeps section id offer and wires primary CTA to checkout (A1, A2, A8, A9)", () => {
    const checkout = "https://checkout.example/start";
    const { container } = render(
      <OfferSection
        offer={offer}
        assetBase="/launch-assets/discover-your-character"
        priceLine="$12 USD"
        checkoutUrl={checkout}
        sectionBandHeading="font-semibold"
        locale={Languages.ES}
      />,
    );

    expect(container.querySelector("#offer")).not.toBeNull();
    const cta = screen.getByRole("link", { name: offer.ctaPrimary });
    expect(cta).toHaveAttribute("href", checkout);
    expect(cta.className).toContain("bg-brand-accent");
  });

  it("uses CheckoutLink fallback #offer when checkout URL empty (A9)", () => {
    render(
      <OfferSection
        offer={offer}
        assetBase="/launch-assets/discover-your-character"
        priceLine="$12 USD"
        checkoutUrl=""
        sectionBandHeading=""
        locale={Languages.ES}
      />,
    );
    const cta = screen.getByRole("link", { name: offer.ctaPrimary });
    expect(cta).toHaveAttribute("href", "#offer");
  });

  it("renders value stack price line and support mailto (A4)", () => {
    render(
      <OfferSection
        offer={offer}
        assetBase="/launch-assets/discover-your-character"
        priceLine="$99 USD"
        checkoutUrl="#"
        sectionBandHeading=""
        locale={Languages.ES}
      />,
    );
    expect(screen.getByText("$99 USD")).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: offer.supportEmail });
    expect(mail).toHaveAttribute("href", `mailto:${offer.supportEmail}`);
  });
});

describe("UrgencyBlock — deadline template", () => {
  const urgency = (es.offer as EbookLandingCopy["offer"]).urgency;

  afterEach(() => {
    cleanup();
  });

  it("appends localized date line when ISO + template present (A7)", () => {
    render(
      <UrgencyBlock
        urgency={urgency}
        deadlineIso="2026-06-15T12:00:00.000Z"
        locale={Languages.ES}
      />,
    );
    const list = screen.getByRole("list");
    const items = within(list).getAllByRole("listitem");
    const last = items[items.length - 1]?.textContent ?? "";
    expect(last).toMatch(/2026/);
    expect(last).toMatch(/junio|june/i);
  });

  it("does not append date line when ISO absent or unparsable (A7)", () => {
    const { rerender } = render(
      <UrgencyBlock
        urgency={urgency}
        deadlineIso={undefined}
        locale={Languages.EN}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(urgency.bullets.length);

    rerender(
      <UrgencyBlock
        urgency={urgency}
        deadlineIso="bogus"
        locale={Languages.EN}
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(urgency.bullets.length);
  });
});
