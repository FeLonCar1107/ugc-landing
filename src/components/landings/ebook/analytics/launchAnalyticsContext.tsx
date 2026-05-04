"use client";

import { createContext, useContext } from "react";

export type LaunchAnalyticsContextValue = {
  slug: string;
  locale: string;
};

export const LaunchAnalyticsContext =
  createContext<LaunchAnalyticsContextValue | null>(null);

export function useLaunchAnalytics() {
  return useContext(LaunchAnalyticsContext);
}
