export const siteConfig = {
  name: "Catalyst Influence",
  legalName: "Catalyst Influence",
  shortName: "Catalyst",
  url: "https://www.catalystintellegence.com",
  description:
    "Catalyst Influence builds predictable customer acquisition systems for established service businesses through programmatic SEO, paid acquisition, conversion architecture, and automation.",
  founder: "Abel V.",
  email: "hello@catalystintellegence.com",
  availability: "Accepting 2 established partners per quarter",
  defaultOgImage: "/founder-abel-v3.png",
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
