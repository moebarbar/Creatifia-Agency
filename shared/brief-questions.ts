/**
 * Definition of the multi-step discovery brief.
 *
 * Shared between client (renders the wizard) and server (validates &
 * determines completeness). Each step carries explanatory copy + an example
 * so clients understand exactly what we're asking and why.
 *
 * Answers are stored as a flat key/value map (JSONB) so partial progress can
 * be autosaved at any point, even mid-step.
 */

export type BriefFieldType =
  | "text"
  | "textarea"
  | "email"
  | "url"
  | "select"
  | "multiselect";

export interface BriefField {
  id: string;
  label: string;
  type: BriefFieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  /** Helper text shown under the field. */
  help?: string;
}

export interface BriefStep {
  id: string;
  title: string;
  /** Plain-language description of why this step matters. */
  description: string;
  /** A concrete example to make the ask tangible. */
  example?: string;
  fields: BriefField[];
}

export const BRIEF_STEPS: BriefStep[] = [
  {
    id: "business",
    title: "Tell us about your business",
    description:
      "The basics so we understand who you are and what you do. This shapes the entire direction of your website.",
    example:
      'Example: "Bloom Bakery — a family-owned artisan bakery in Austin, TX, known for sourdough and custom celebration cakes."',
    fields: [
      {
        id: "businessName",
        label: "Business name",
        type: "text",
        placeholder: "Bloom Bakery",
        required: true,
      },
      {
        id: "industry",
        label: "Industry",
        type: "select",
        required: true,
        options: [
          "Tech & SaaS",
          "E-Commerce & Retail",
          "Restaurants & Food",
          "Real Estate & Property",
          "Health & Wellness",
          "Professional Services",
          "Other",
        ],
      },
      {
        id: "businessDescription",
        label: "What does your business do?",
        type: "textarea",
        placeholder: "Describe your business in a few sentences…",
        required: true,
        help: "Pretend you're explaining it to someone who's never heard of you.",
      },
    ],
  },
  {
    id: "goals",
    title: "What should the website achieve?",
    description:
      "Your website should do a job. Knowing the #1 goal lets us design every page to drive that outcome.",
    example:
      'Example: "Get more catering inquiries" or "Take online orders directly instead of through third-party apps."',
    fields: [
      {
        id: "primaryGoal",
        label: "Primary goal of the website",
        type: "select",
        required: true,
        options: [
          "Generate leads / inquiries",
          "Sell products online",
          "Take bookings / appointments",
          "Build credibility / brand",
          "Showcase a portfolio",
          "Other",
        ],
      },
      {
        id: "targetAudience",
        label: "Who is your target customer?",
        type: "textarea",
        placeholder: "Age, location, what they care about…",
        help: "The more specific, the better we can speak to them.",
      },
      {
        id: "successMetric",
        label: "How will you know the site is working?",
        type: "text",
        placeholder: "e.g. 10 catering inquiries per month",
      },
    ],
  },
  {
    id: "brand",
    title: "Your brand & style",
    description:
      "We want the site to feel like you. Share any existing brand assets and the vibe you're going for.",
    example:
      'Example: "Warm and rustic, earthy tones, friendly — not corporate. Our logo is green and cream."',
    fields: [
      {
        id: "hasBranding",
        label: "Do you have existing branding?",
        type: "select",
        options: ["Full brand kit", "Just a logo", "Nothing yet"],
      },
      {
        id: "styleDescription",
        label: "Describe the style/vibe you want",
        type: "textarea",
        placeholder: "Modern, bold, minimal, playful, luxurious…",
      },
      {
        id: "brandColors",
        label: "Brand colors (if any)",
        type: "text",
        placeholder: "#2E7D32, cream, charcoal",
      },
    ],
  },
  {
    id: "content",
    title: "Pages & content",
    description:
      "Which pages do you need, and is your content (text, photos) ready? This drives the timeline.",
    example:
      'Example: "Home, Menu, About, Contact. Photos are ready; still writing the About text."',
    fields: [
      {
        id: "pages",
        label: "Pages you need",
        type: "multiselect",
        options: [
          "Home",
          "About",
          "Services",
          "Products / Shop",
          "Menu",
          "Portfolio / Gallery",
          "Blog",
          "Contact",
          "Booking",
          "FAQ",
        ],
      },
      {
        id: "contentReady",
        label: "Is your content ready?",
        type: "select",
        options: [
          "Yes, everything is ready",
          "Partially ready",
          "No, we need help with content",
        ],
      },
      {
        id: "contentNotes",
        label: "Anything else about your content?",
        type: "textarea",
        placeholder: "Photos, copy, product list, etc.",
      },
    ],
  },
  {
    id: "inspiration",
    title: "Inspiration & examples",
    description:
      "Show us sites you love (and ones you don't). Examples are the fastest way to align on taste.",
    example:
      'Example: "I love stripe.com\'s clean layout and apple.com\'s big imagery. I dislike cluttered sites."',
    fields: [
      {
        id: "likedSites",
        label: "Websites you like",
        type: "textarea",
        placeholder: "Paste a few URLs and what you like about each",
      },
      {
        id: "competitors",
        label: "Competitor websites",
        type: "textarea",
        placeholder: "Who are your main competitors online?",
      },
    ],
  },
  {
    id: "logistics",
    title: "Domain & logistics",
    description:
      "Final practical details so we can launch smoothly when the design is approved.",
    example:
      'Example: "We own bloombakery.com. Best email is jane@bloombakery.com. We\'d love to launch within a month."',
    fields: [
      {
        id: "domain",
        label: "Do you have a domain?",
        type: "text",
        placeholder: "bloombakery.com (or 'not yet')",
      },
      {
        id: "contactEmail",
        label: "Best contact email",
        type: "email",
        placeholder: "you@business.com",
      },
      {
        id: "timeline",
        label: "Desired launch timeline",
        type: "select",
        options: ["ASAP", "Within 2 weeks", "Within a month", "Flexible"],
      },
      {
        id: "additionalNotes",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder: "Special requirements, integrations, etc.",
      },
    ],
  },
];

/** All field ids that are required for the brief to count as complete. */
export const REQUIRED_BRIEF_FIELDS: string[] = BRIEF_STEPS.flatMap((step) =>
  step.fields.filter((f) => f.required).map((f) => f.id),
);

export function isBriefComplete(answers: Record<string, unknown>): boolean {
  return REQUIRED_BRIEF_FIELDS.every((id) => {
    const v = answers[id];
    return v !== undefined && v !== null && String(v).trim() !== "";
  });
}

export const TOTAL_BRIEF_STEPS = BRIEF_STEPS.length;
