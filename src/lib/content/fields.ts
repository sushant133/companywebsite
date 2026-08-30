import type { ContentSection } from "@/lib/content/schema";

/**
 * How each content section is presented in the dashboard.
 *
 * The shapes in `schema.ts` say what a valid section *is*; this says how to
 * edit one. Keeping it declarative means a single generic editor renders every
 * section, and adding a field is a change in two files rather than a new form.
 *
 * This module is imported by client components, so it holds plain data only.
 */

export type FieldSpec =
  | { kind: "text"; name: string; label: string; help?: string; placeholder?: string }
  | { kind: "textarea"; name: string; label: string; help?: string; rows?: number }
  /** A heading, where `[[brackets]]` mark the brand-gradient run. */
  | { kind: "heading"; name: string; label: string; help?: string }
  | { kind: "image"; name: string; label: string; help?: string }
  | { kind: "icon"; name: string; label: string; help?: string }
  | { kind: "color"; name: string; label: string; help?: string }
  | { kind: "switch"; name: string; label: string; help?: string }
  | { kind: "number"; name: string; label: string; help?: string; min?: number; max?: number }
  | {
      kind: "select";
      name: string;
      label: string;
      help?: string;
      options: { value: string; label: string }[];
    }
  /** An editable list of plain strings — features, tech tags, bullet points. */
  | { kind: "strings"; name: string; label: string; help?: string; addLabel?: string }
  | {
      kind: "group";
      name: string;
      label: string;
      help?: string;
      fields: FieldSpec[];
      /** Lays the child fields out side by side where there is room. */
      columns?: 1 | 2;
    }
  | {
      kind: "list";
      name: string;
      label: string;
      help?: string;
      /** Which child field to show on the collapsed row. */
      titleKey: string;
      addLabel: string;
      blank: Record<string, unknown>;
      fields: FieldSpec[];
    };

export type SectionSpec = {
  label: string;
  description: string;
  /** Where the section shows up on the public site. */
  preview: string;
  icon: string;
  fields: FieldSpec[];
};

// ------------------------------------------------------------ fragments ---

const linkFields: FieldSpec[] = [
  { kind: "text", name: "label", label: "Label" },
  { kind: "text", name: "href", label: "Link", placeholder: "/about" },
];

const ctaGroup = (name: string, label: string): FieldSpec => ({
  kind: "group",
  name,
  label,
  columns: 2,
  fields: linkFields,
});

const bannerGroup: FieldSpec = {
  kind: "group",
  name: "banner",
  label: "Page banner",
  help: "The dark band at the top of the page.",
  fields: [
    { kind: "text", name: "eyebrow", label: "Eyebrow" },
    { kind: "heading", name: "title", label: "Title" },
    { kind: "textarea", name: "description", label: "Description", rows: 3 },
    { kind: "image", name: "image", label: "Background image" },
    {
      kind: "text",
      name: "crumb",
      label: "Breadcrumb",
      help: "Leave empty to hide the Home / … trail.",
    },
    {
      kind: "list",
      name: "points",
      label: "Pills",
      titleKey: "label",
      addLabel: "Add pill",
      blank: { icon: "FaCircleCheck", label: "New pill" },
      fields: [
        { kind: "icon", name: "icon", label: "Icon" },
        { kind: "text", name: "label", label: "Label" },
      ],
    },
  ],
};

const headerFields: FieldSpec[] = [
  { kind: "text", name: "tag", label: "Tag" },
  { kind: "heading", name: "title", label: "Title" },
  { kind: "textarea", name: "description", label: "Description", rows: 2 },
];

const ctaBandGroup: FieldSpec = {
  kind: "group",
  name: "cta",
  label: "Closing call to action",
  help: "The gradient band at the foot of the page.",
  fields: [
    { kind: "text", name: "title", label: "Title" },
    { kind: "textarea", name: "description", label: "Description", rows: 2 },
    ctaGroup("primary", "Primary button"),
    ctaGroup("secondary", "Secondary button"),
  ],
};

// ------------------------------------------------------------- sections ---

export const sectionSpecs: Record<ContentSection, SectionSpec> = {
  site: {
    label: "Site & Contact",
    description:
      "Company name, logo, navigation, footer links, contact details and social profiles.",
    preview: "/",
    icon: "FaBuilding",
    fields: [
      {
        kind: "group",
        name: "",
        label: "Identity",
        fields: [
          { kind: "text", name: "name", label: "Company name" },
          {
            kind: "heading",
            name: "shortName",
            label: "Wordmark",
            help: "Shown in the header and footer. Wrap part of it in [[brackets]] for the gradient.",
          },
          {
            kind: "textarea",
            name: "description",
            label: "Description",
            rows: 3,
            help: "Used in the footer, the page metadata and the marketing email header.",
          },
          {
            kind: "text",
            name: "url",
            label: "Site URL",
            help: "No trailing slash. Links in emails are built from this.",
          },
          { kind: "image", name: "logo", label: "Logo" },
          {
            kind: "text",
            name: "googleSiteVerification",
            label: "Google verification token",
          },
        ],
      },
      {
        kind: "list",
        name: "navLinks",
        label: "Header navigation",
        titleKey: "label",
        addLabel: "Add link",
        blank: { label: "New page", href: "/" },
        fields: linkFields,
      },
      ctaGroup("headerCta", "Header button"),
      {
        kind: "list",
        name: "footerLinks",
        label: "Footer links",
        titleKey: "label",
        addLabel: "Add link",
        blank: { label: "New link", href: "/" },
        fields: linkFields,
      },
      {
        kind: "group",
        name: "contact",
        label: "Contact details",
        help: "Used by the footer, the contact page and the email footer.",
        fields: [
          { kind: "textarea", name: "address", label: "Address", rows: 2 },
          {
            kind: "textarea",
            name: "addressShort",
            label: "Short address",
            rows: 2,
          },
          { kind: "strings", name: "phones", label: "Phone numbers", addLabel: "Add number" },
          { kind: "text", name: "email", label: "Email" },
          { kind: "text", name: "hours", label: "Opening hours (short)" },
          {
            kind: "strings",
            name: "hoursLong",
            label: "Opening hours (full)",
            addLabel: "Add line",
          },
          { kind: "text", name: "whatsapp", label: "WhatsApp link" },
          {
            kind: "textarea",
            name: "mapEmbedUrl",
            label: "Google Maps embed URL",
            rows: 2,
            help: "The src of the embed iframe. Clear it to hide the map.",
          },
        ],
      },
      {
        kind: "list",
        name: "socials",
        label: "Social profiles",
        titleKey: "label",
        addLabel: "Add profile",
        blank: { label: "New profile", href: "https://", icon: "FaGlobe" },
        fields: [
          { kind: "text", name: "label", label: "Name" },
          { kind: "text", name: "href", label: "URL" },
          { kind: "icon", name: "icon", label: "Icon" },
        ],
      },
    ],
  },

  home: {
    label: "Home page",
    description:
      "Hero, why choose us, services intro, tech stack, process, FAQ and the closing band.",
    preview: "/",
    icon: "FaHouse",
    fields: [
      {
        kind: "group",
        name: "hero",
        label: "Hero",
        fields: [
          { kind: "text", name: "badge", label: "Badge text" },
          { kind: "icon", name: "badgeIcon", label: "Badge icon" },
          { kind: "heading", name: "title", label: "Headline" },
          {
            kind: "strings",
            name: "typingWords",
            label: "Typed words",
            addLabel: "Add word",
            help: "Cycled after the headline. The first one is what search engines see.",
          },
          { kind: "textarea", name: "description", label: "Description", rows: 4 },
          { kind: "image", name: "image", label: "Background image" },
          ctaGroup("primaryCta", "Primary button"),
          ctaGroup("secondaryCta", "Secondary button"),
        ],
      },
      {
        kind: "group",
        name: "why",
        label: "Why choose us",
        fields: [
          ...headerFields,
          { kind: "image", name: "image", label: "Illustration" },
          {
            kind: "list",
            name: "items",
            label: "Reasons",
            titleKey: "title",
            addLabel: "Add reason",
            blank: { icon: "FaStar", title: "New reason", description: "" },
            fields: [
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "text", name: "title", label: "Title" },
              { kind: "textarea", name: "description", label: "Description", rows: 3 },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "servicesPreview",
        label: "Services preview",
        help: "The heading above the service cards. The cards themselves come from the Services page.",
        fields: [
          ...headerFields,
          ctaGroup("primaryCta", "Primary button"),
          ctaGroup("secondaryCta", "Secondary button"),
        ],
      },
      {
        kind: "group",
        name: "tech",
        label: "Tech stack",
        fields: [
          ...headerFields,
          {
            kind: "list",
            name: "categories",
            label: "Categories",
            titleKey: "title",
            addLabel: "Add category",
            blank: { title: "New category", icon: "FaCode", items: [] },
            fields: [
              { kind: "text", name: "title", label: "Title" },
              { kind: "icon", name: "icon", label: "Icon" },
              {
                kind: "list",
                name: "items",
                label: "Technologies",
                titleKey: "label",
                addLabel: "Add technology",
                blank: { label: "New technology", icon: "FaCode" },
                fields: [
                  { kind: "text", name: "label", label: "Name" },
                  { kind: "icon", name: "icon", label: "Icon" },
                ],
              },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "process",
        label: "How we work",
        fields: [
          ...headerFields,
          { kind: "image", name: "image", label: "Illustration" },
          {
            kind: "list",
            name: "steps",
            label: "Steps",
            titleKey: "title",
            addLabel: "Add step",
            blank: { number: "01", title: "New step", description: "" },
            fields: [
              { kind: "text", name: "number", label: "Number" },
              { kind: "text", name: "title", label: "Title" },
              { kind: "textarea", name: "description", label: "Description", rows: 3 },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "faq",
        label: "Frequently asked questions",
        fields: [
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "text", name: "searchPlaceholder", label: "Search placeholder" },
          { kind: "image", name: "image", label: "Illustration" },
          {
            kind: "list",
            name: "items",
            label: "Questions",
            titleKey: "question",
            addLabel: "Add question",
            blank: { question: "New question", answer: "" },
            fields: [
              { kind: "text", name: "question", label: "Question" },
              { kind: "textarea", name: "answer", label: "Answer", rows: 4 },
            ],
          },
        ],
      },
      ctaBandGroup,
    ],
  },

  testimonials: {
    label: "Testimonials",
    description:
      "Client quotes shown on the home page. The band stays hidden until you switch it on and add at least one quote.",
    preview: "/",
    icon: "FaQuoteLeft",
    fields: [
      {
        kind: "group",
        name: "",
        label: "Section",
        fields: [
          {
            kind: "switch",
            name: "enabled",
            label: "Show on the home page",
          },
          { kind: "text", name: "tag", label: "Tag" },
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "textarea", name: "description", label: "Description", rows: 2 },
        ],
      },
      {
        kind: "list",
        name: "items",
        label: "Quotes",
        titleKey: "name",
        addLabel: "Add testimonial",
        blank: {
          name: "New client",
          role: "",
          company: "",
          quote: "",
          rating: 5,
          gradient: "from-[#6366f1] to-[#0ea5e9]",
        },
        fields: [
          { kind: "text", name: "name", label: "Name" },
          { kind: "text", name: "role", label: "Role" },
          { kind: "text", name: "company", label: "Company" },
          { kind: "textarea", name: "quote", label: "Quote", rows: 4 },
          { kind: "number", name: "rating", label: "Rating", min: 1, max: 5 },
          {
            kind: "text",
            name: "gradient",
            label: "Avatar gradient",
            help: "Tailwind classes, e.g. from-[#6366f1] to-[#0ea5e9].",
          },
        ],
      },
    ],
  },

  services: {
    label: "Services page",
    description:
      "The service list, which also feeds the home page cards and the footer column.",
    preview: "/services",
    icon: "FaLayerGroup",
    fields: [
      bannerGroup,
      { kind: "group", name: "header", label: "Section heading", fields: headerFields },
      {
        kind: "list",
        name: "items",
        label: "Services",
        titleKey: "title",
        addLabel: "Add service",
        blank: {
          slug: "new-service",
          title: "New service",
          icon: "FaCode",
          teaser: "",
          description: "",
          image: "",
          features: [],
          tech: [],
        },
        fields: [
          { kind: "text", name: "title", label: "Title" },
          {
            kind: "text",
            name: "slug",
            label: "Slug",
            help: "Lowercase, hyphenated. Used as the list key.",
          },
          { kind: "icon", name: "icon", label: "Icon" },
          { kind: "image", name: "image", label: "Photograph" },
          {
            kind: "textarea",
            name: "teaser",
            label: "Teaser",
            rows: 2,
            help: "The one-liner on the home page card.",
          },
          { kind: "textarea", name: "description", label: "Description", rows: 4 },
          { kind: "strings", name: "features", label: "Features", addLabel: "Add feature" },
          { kind: "strings", name: "tech", label: "Technologies", addLabel: "Add technology" },
        ],
      },
      ctaBandGroup,
    ],
  },

  products: {
    label: "Products page",
    description: "The product catalogue and its banner.",
    preview: "/products",
    icon: "FaBoxesStacked",
    fields: [
      bannerGroup,
      { kind: "group", name: "header", label: "Section heading", fields: headerFields },
      {
        kind: "list",
        name: "items",
        label: "Products",
        titleKey: "title",
        addLabel: "Add product",
        blank: {
          title: "New product",
          icon: "FaCube",
          badge: "New",
          featured: false,
          description: "",
          features: [],
        },
        fields: [
          { kind: "text", name: "title", label: "Title" },
          { kind: "icon", name: "icon", label: "Icon" },
          { kind: "text", name: "badge", label: "Badge" },
          {
            kind: "switch",
            name: "featured",
            label: "Featured",
            help: "Gives the badge the brand gradient instead of the tinted pill.",
          },
          { kind: "textarea", name: "description", label: "Description", rows: 4 },
          { kind: "strings", name: "features", label: "Features", addLabel: "Add feature" },
        ],
      },
      ctaBandGroup,
    ],
  },

  projects: {
    label: "Projects / Portfolio",
    description:
      "Delivered work. The first project is shown as the featured case; the rest fall into a grid.",
    preview: "/projects",
    icon: "FaFolderOpen",
    fields: [
      bannerGroup,
      { kind: "group", name: "header", label: "Section heading", fields: headerFields },
      {
        kind: "list",
        name: "items",
        label: "Projects",
        titleKey: "title",
        addLabel: "Add project",
        blank: {
          slug: "new-project",
          title: "New project",
          icon: "FaCode",
          image: "",
          liveUrl: "",
          categories: [],
          description: "",
          features: [],
          tech: [],
        },
        fields: [
          { kind: "text", name: "title", label: "Title" },
          { kind: "text", name: "slug", label: "Slug" },
          { kind: "icon", name: "icon", label: "Icon", help: "Used when there is no screenshot." },
          { kind: "image", name: "image", label: "Screenshot" },
          { kind: "text", name: "liveUrl", label: "Live URL", help: "Leave empty to hide the button." },
          { kind: "strings", name: "categories", label: "Categories", addLabel: "Add category" },
          { kind: "textarea", name: "description", label: "Description", rows: 4 },
          { kind: "strings", name: "features", label: "Features", addLabel: "Add feature" },
          { kind: "strings", name: "tech", label: "Tech stack", addLabel: "Add technology" },
        ],
      },
      ctaBandGroup,
    ],
  },

  team: {
    label: "Team page",
    description: "Groups and the people in them.",
    preview: "/team",
    icon: "FaUsers",
    fields: [
      bannerGroup,
      {
        kind: "group",
        name: "leadershipHeader",
        label: "Leadership heading",
        fields: headerFields,
      },
      {
        kind: "list",
        name: "groups",
        label: "Groups",
        titleKey: "title",
        addLabel: "Add group",
        blank: {
          title: "New group",
          blurb: "",
          layout: "default",
          members: [],
        },
        fields: [
          { kind: "text", name: "title", label: "Group name" },
          { kind: "textarea", name: "blurb", label: "Blurb", rows: 2 },
          {
            kind: "select",
            name: "layout",
            label: "Layout",
            help: "Leadership renders two wide cards; default renders a four-up grid.",
            options: [
              { value: "leadership", label: "Leadership" },
              { value: "default", label: "Default" },
            ],
          },
          {
            kind: "list",
            name: "members",
            label: "Members",
            titleKey: "name",
            addLabel: "Add member",
            blank: {
              name: "New member",
              role: "Role",
              bio: "",
              gradient: "from-[#6366f1] to-[#0ea5e9]",
              image: "",
            },
            fields: [
              { kind: "text", name: "name", label: "Name" },
              { kind: "text", name: "role", label: "Role" },
              { kind: "textarea", name: "bio", label: "Bio", rows: 3 },
              { kind: "image", name: "image", label: "Portrait", help: "Falls back to initials." },
              {
                kind: "text",
                name: "gradient",
                label: "Avatar gradient",
                help: "Tailwind classes, e.g. from-[#6366f1] to-[#8b5cf6].",
              },
            ],
          },
        ],
      },
    ],
  },

  about: {
    label: "About page",
    description:
      "Story, foundation, values, differentiators and the industries index.",
    preview: "/about",
    icon: "FaBuildingColumns",
    fields: [
      bannerGroup,
      {
        kind: "group",
        name: "story",
        label: "Who we are",
        fields: [
          { kind: "text", name: "eyebrow", label: "Eyebrow" },
          { kind: "heading", name: "title", label: "Heading" },
          {
            kind: "strings",
            name: "paragraphs",
            label: "Paragraphs",
            addLabel: "Add paragraph",
          },
          { kind: "image", name: "image", label: "Photograph" },
          { kind: "text", name: "imageAlt", label: "Photograph description" },
          ctaGroup("primaryCta", "Primary button"),
          ctaGroup("secondaryCta", "Secondary button"),
          {
            kind: "list",
            name: "highlights",
            label: "Highlights",
            titleKey: "title",
            addLabel: "Add highlight",
            blank: { icon: "FaStar", title: "New highlight", description: "" },
            fields: [
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "text", name: "title", label: "Title" },
              { kind: "text", name: "description", label: "Description" },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "foundation",
        label: "Our foundation",
        fields: [
          { kind: "text", name: "eyebrow", label: "Eyebrow" },
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "textarea", name: "description", label: "Description", rows: 2 },
          { kind: "image", name: "image", label: "Photograph" },
          {
            kind: "list",
            name: "cards",
            label: "Rows",
            titleKey: "title",
            addLabel: "Add row",
            blank: { label: "04", title: "New row", body: "", icon: "FaStar", points: [] },
            fields: [
              { kind: "text", name: "label", label: "Number" },
              { kind: "text", name: "title", label: "Title" },
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "textarea", name: "body", label: "Body", rows: 4 },
              { kind: "strings", name: "points", label: "Points", addLabel: "Add point" },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "values",
        label: "Core values",
        fields: [
          { kind: "text", name: "eyebrow", label: "Eyebrow" },
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "textarea", name: "description", label: "Description", rows: 2 },
          {
            kind: "list",
            name: "items",
            label: "Values",
            titleKey: "title",
            addLabel: "Add value",
            blank: {
              title: "New value",
              description: "",
              icon: "FaStar",
              accent: "#6366f1",
            },
            fields: [
              { kind: "text", name: "title", label: "Title" },
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "color", name: "accent", label: "Accent colour" },
              { kind: "textarea", name: "description", label: "Description", rows: 3 },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "different",
        label: "What makes us different",
        fields: [
          { kind: "text", name: "eyebrow", label: "Eyebrow" },
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "textarea", name: "description", label: "Description", rows: 2 },
          { kind: "image", name: "image", label: "Photograph" },
          {
            kind: "list",
            name: "items",
            label: "Accordion rows",
            titleKey: "title",
            addLabel: "Add row",
            blank: { title: "New row", body: "", icon: "FaStar" },
            fields: [
              { kind: "text", name: "title", label: "Title" },
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "textarea", name: "body", label: "Body", rows: 4 },
            ],
          },
          {
            kind: "list",
            name: "tiles",
            label: "Capability tiles",
            help: "Six tiles surround the logo in the 3x3 grid.",
            titleKey: "label",
            addLabel: "Add tile",
            blank: { icon: "FaBolt", label: "New" },
            fields: [
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "text", name: "label", label: "Label" },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "industries",
        label: "Industries",
        fields: [
          { kind: "text", name: "eyebrow", label: "Eyebrow" },
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "textarea", name: "description", label: "Description", rows: 2 },
          {
            kind: "list",
            name: "items",
            label: "Industries",
            titleKey: "title",
            addLabel: "Add industry",
            blank: { title: "New industry", icon: "FaBriefcase", accent: "#6366f1" },
            fields: [
              { kind: "text", name: "title", label: "Name" },
              { kind: "icon", name: "icon", label: "Icon" },
              { kind: "color", name: "accent", label: "Accent colour" },
            ],
          },
        ],
      },
      ctaBandGroup,
    ],
  },

  contact: {
    label: "Contact page",
    description:
      "Banner, intro copy and the enquiry form. Addresses and phone numbers live in Site & Contact.",
    preview: "/contact",
    icon: "FaEnvelope",
    fields: [
      bannerGroup,
      {
        kind: "group",
        name: "intro",
        label: "Intro",
        fields: [
          { kind: "heading", name: "title", label: "Heading" },
          { kind: "textarea", name: "description", label: "Description", rows: 3 },
          { kind: "text", name: "socialsHeading", label: "Socials heading" },
        ],
      },
      {
        kind: "group",
        name: "form",
        label: "Enquiry form",
        fields: [
          { kind: "text", name: "heading", label: "Form heading" },
          { kind: "textarea", name: "description", label: "Form intro", rows: 2 },
          { kind: "text", name: "submitLabel", label: "Submit button" },
          {
            kind: "list",
            name: "services",
            label: "Service options",
            help: "The choices in the 'Service Interested In' dropdown.",
            titleKey: "label",
            addLabel: "Add option",
            blank: { value: "new-option", label: "New option" },
            fields: [
              { kind: "text", name: "label", label: "Label" },
              { kind: "text", name: "value", label: "Stored value" },
            ],
          },
        ],
      },
      {
        kind: "group",
        name: "",
        label: "Map",
        fields: [
          {
            kind: "switch",
            name: "showMap",
            label: "Show the map",
            help: "The embed URL itself is in Site & Contact.",
          },
        ],
      },
    ],
  },
};

export const sectionOrder: ContentSection[] = [
  "site",
  "home",
  "about",
  "services",
  "products",
  "projects",
  "team",
  "testimonials",
  "contact",
];
