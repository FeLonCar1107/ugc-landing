import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: function NextImageMock({
    src,
    alt,
    fill: _fill,
    priority: _priority,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    onLoadingComplete: _onLoadingComplete,
    loader: _loader,
    quality: _quality,
    ...rest
  }: {
    src: string | { src?: string };
    alt?: string;
    fill?: boolean;
    [key: string]: unknown;
  }) {
    const resolved =
      typeof src === "string"
        ? src
        : src && typeof src === "object" && "src" in src
          ? String((src as { src?: string }).src ?? "")
          : "";
    return React.createElement("img", {
      src: resolved,
      alt: alt ?? "",
      ...rest,
    });
  },
}));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: () => true,
  };
});
