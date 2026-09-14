export type FaqItem = {
  question: string;
  answer: string;
};

export function getExecutiveFaqs(city?: string | null): FaqItem[] {
  return [
    {
      question: "The 90-Day Execution Guarantee",
      answer:
        "If Catalyst fails to complete the agreed deployment milestones during the initial 90-Day engagement, we continue working at no additional management fee until those milestones are completely satisfied. We guarantee execution and accountability.",
    },
    {
      question: city ? `Do you work with businesses in ${city}?` : "What type of businesses are the best fit?",
      answer: city
        ? `Yes. Catalyst partners with established service businesses competing in ${city} when there is proven demand, meaningful customer value, and enough operational capacity to handle additional qualified opportunities.`
        : "The best fit is an established service business with proven demand, high customer value, and enough operational capacity to handle more qualified opportunities.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "The first 30 days usually clarify the acquisition architecture, tracking gaps, and page or campaign priorities. Meaningful performance signals typically appear as the system is deployed and measured through the full 90-day engagement.",
    },
    {
      question: "What makes Catalyst different from a traditional marketing agency?",
      answer:
        "Catalyst does not treat SEO, ads, landing pages, follow-up, and reporting as separate services. We connect them into one customer acquisition system so leadership can see what is working, what is leaking value, and what should scale.",
    },
    {
      question: "Do you handle SEO, paid ads, landing pages, and follow-up together?",
      answer:
        "Yes. The exact channel mix depends on the business, but the strategy is integrated: demand capture, conversion architecture, CRM handoff, follow-up, and measurement are designed to support the same commercial outcome.",
    },
    {
      question: city ? `Is local SEO enough for service businesses in ${city}?` : "Is SEO alone enough to create predictable customer acquisition?",
      answer: city
        ? `Usually not. Local SEO can create demand capture in ${city}, but stronger acquisition also needs trust-building pages, offer clarity, paid traffic strategy when appropriate, follow-up speed, and source attribution.`
        : "Usually not. SEO can capture demand, but predictable acquisition also depends on trust-building pages, offer clarity, paid traffic strategy when appropriate, follow-up speed, and source attribution.",
    },
    {
      question: "Can you work with our existing website or CRM?",
      answer:
        "Yes. Catalyst starts by evaluating the existing environment. If your site, CRM, or tools can support the acquisition system, we improve the structure around them before recommending replacement.",
    },
    {
      question: "Do you work with startups?",
      answer:
        "We generally do not. We partner with established service businesses with proven demand, where the customer value is high enough to support paid acquisition and there is operational ability to handle additional volume.",
    },
    {
      question: "What exactly are the deliverables?",
      answer:
        "You are not buying SEO or Facebook Ads. You are buying a predictable customer-acquisition environment. Depending on your business, this includes landing-page architecture, technical SEO, programmatic builds, and multi-channel paid media funnels.",
    },
  ];
}
