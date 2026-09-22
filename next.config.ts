import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/industries/dentist",
        destination: "/industries/dental-practices",
        permanent: true,
      },
      {
        source: "/industries/dentist/:market",
        destination: "/industries/dental-practices/:market",
        permanent: true,
      },
      {
        source: "/location",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/location/:slug",
        destination: "/locations/:slug",
        permanent: true,
      },
      {
        source: "/locations/state/:state",
        destination: "/locations/states/:state",
        permanent: true,
      },
      {
        source: "/city/:slug",
        destination: "/locations/:slug",
        permanent: true,
      },
      {
        source: "/cities/:slug",
        destination: "/locations/:slug",
        permanent: true,
      },
      {
        source: "/industry/:slug",
        destination: "/industries/:slug",
        permanent: true,
      },
      {
        source: "/service/:slug",
        destination: "/services/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
