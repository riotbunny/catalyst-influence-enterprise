import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { getIndexableIndustries } from "@/content/industries";
import { getIndexableLocations } from "@/content/locations";
import { getMarketIntentPages } from "@/content/marketIntents";
import { getIndexableServices } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-09-13"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: new Date("2026-09-13"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/industries"),
      lastModified: new Date("2026-09-13"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/locations"),
      lastModified: new Date("2026-09-13"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const servicePages = getIndexableServices().map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: new Date(service.lastModified),
    changeFrequency: "monthly" as const,
    priority: service.priority,
  }));

  const industryPages = getIndexableIndustries().map((industry) => ({
    url: absoluteUrl(`/industries/${industry.slug}`),
    lastModified: new Date(industry.lastModified),
    changeFrequency: "monthly" as const,
    priority: industry.priority,
  }));

  const locationPages = getIndexableLocations().map((location) => ({
    url: absoluteUrl(`/locations/${location.marketSlug}`),
    lastModified: new Date(location.lastModified),
    changeFrequency: "monthly" as const,
    priority: location.priority,
  }));

  const marketIntentPages = getMarketIntentPages().map((page) => ({
    url: absoluteUrl(`/${page.intentSlug}/${page.marketSlug}`),
    lastModified: new Date(page.lastModified),
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  return [...staticPages, ...servicePages, ...industryPages, ...locationPages, ...marketIntentPages];
}
