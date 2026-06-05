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
        checkoutUrl={checkout}
        sectionBandHeading="font-semibold"
        locale={Languages.ES}
        slug="discover-your-character"
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
        checkoutUrl=""
        sectionBandHeading=""
        locale={Languages.ES}
        slug="discover-your-character"
      />,
    );
    const cta = screen.getByRole("link", { name: offer.ctaPrimary });
    expect(cta).toHaveAttribute("href", "#offer");
  });

  it("shows only enabled bonuses and hides section when all disabled", () => {
    const twoBonuses = {
      ...offer,
      bonuses: offer.bonuses.map((b, i) => ({ ...b, enabled: i < 2 })),
    };
    const { unmount } = render(
      <OfferSection
        offer={twoBonuses}
        assetBase="/launch-assets/discover-your-character"
        checkoutUrl="#"
        sectionBandHeading=""
        locale={Languages.ES}
        slug="discover-your-character"
      />,
    );
    expect(
      screen.getByText(twoBonuses.bonuses[0]?.painHeadline ?? ""),
    ).toBeInTheDocument();
    expect(
      screen.getByText(twoBonuses.bonuses[1]?.painHeadline ?? ""),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(twoBonuses.bonuses[2]?.painHeadline ?? ""),
    ).toBeNull();
    unmount();

    const noBonuses = {
      ...offer,
      bonuses: offer.bonuses.map((b) => ({ ...b, enabled: false })),
    };
    render(
      <OfferSection
        offer={noBonuses}
        assetBase="/launch-assets/discover-your-character"
        checkoutUrl="#"
        sectionBandHeading=""
        locale={Languages.ES}
        slug="discover-your-character"
      />,
    );
    expect(
      screen.queryByRole("heading", { name: offer.bonusesSectionTitle }),
    ).toBeNull();
    expect(screen.queryByText(offer.bonuses[0]?.painHeadline ?? "")).toBeNull();
    expect(screen.getByText(offer.hero.badges[0] ?? "")).toBeInTheDocument();
    expect(screen.queryByText(offer.hero.badges[1] ?? "")).toBeNull();
  });

  it("renders value stack price line (A4)", () => {
    render(
      <OfferSection
        offer={offer}
        assetBase="/launch-assets/discover-your-character"
        checkoutUrl="#"
        sectionBandHeading=""
        locale={Languages.ES}
        slug="discover-your-character"
      />,
    );
    // latam normal price for discover-your-character (no deadline → launch inactive)
    expect(screen.getByText("$22 USD")).toBeInTheDocument();
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
