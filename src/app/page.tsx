import LandingPage from "@/components/LandingPage";
import JsonLd from "@/components/JsonLd";
import { getExecutiveFaqs } from "@/content/faqs";
import { faqJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(getExecutiveFaqs())} />
      <LandingPage />
    </>
  );
}
