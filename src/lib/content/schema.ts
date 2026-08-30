import { z } from "zod";

/**
 * Every piece of copy, image path and list the public site renders is described
 * here. The same schemas validate what the admin dashboard sends and what comes
 * back out of MongoDB, so a malformed document can never reach a page.
 *
 * Headings run through `RichHeading`, so `[[double brackets]]` marks the run
 * that gets the brand gradient and a literal newline becomes a line break.
 */

const text = (max = 400) => z.string().trim().max(max);
const required = (max = 400) => z.string().trim().min(1).max(max);
const longText = (max = 4000) => z.string().trim().max(max);

/** Relative path under /public, or an absolute http(s) URL. */
const image = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v), {
    message: "Use a path starting with / or a full http(s) URL",
  });

const href = required(500);
const icon = z.string().trim().max(60);

/** Hex colour, as used for the per-item accents on the about page. */
const color = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{3,8}$/, "Use a hex colour such as #6366f1");

const link = z.object({ label: required(80), href });
const cta = z.object({ label: required(80), href });
const point = z.object({ icon, label: required(120) });

const banner = z.object({
  eyebrow: required(120),
  title: required(300),
  description: longText(800),
  image,
  crumb: text(80),
  points: z.array(point).max(8),
});

const sectionHeader = z.object({
  tag: required(120),
  title: required(300),
  description: longText(800),
});

const ctaBand = z.object({
  title: required(200),
  description: longText(800),
  primary: cta,
  secondary: cta,
});

// ----------------------------------------------------------------- site ---

export const siteSchema = z.object({
  name: required(120),
  shortName: required(60),
  description: longText(600),
  url: required(300),
  logo: image,
  googleSiteVerification: text(200),
  navLinks: z.array(link).max(20),
  headerCta: cta,
  footerLinks: z.array(link).max(20),
  contact: z.object({
    address: longText(400),
    addressShort: longText(400),
    phones: z.array(required(50)).max(6),
    email: z.email().max(200),
    hours: required(120),
    hoursLong: z.array(required(160)).max(8),
    whatsapp: text(500),
    mapEmbedUrl: text(1200),
  }),
  socials: z.array(z.object({ label: required(60), href, icon })).max(12),
});

// ----------------------------------------------------------------- home ---

export const homeSchema = z.object({
  hero: z.object({
    badge: text(160),
    badgeIcon: icon,
    title: required(200),
    typingWords: z.array(required(60)).max(12),
    description: longText(1200),
    image,
    primaryCta: cta,
    secondaryCta: cta,
  }),
  why: sectionHeader.extend({
    image,
    items: z
      .array(
        z.object({
          icon,
          title: required(120),
          description: longText(600),
        }),
      )
      .max(24),
  }),
  servicesPreview: sectionHeader.extend({
    primaryCta: cta,
    secondaryCta: cta,
  }),
  tech: sectionHeader.extend({
    categories: z
      .array(
        z.object({
          title: required(80),
          icon,
          items: z.array(z.object({ label: required(60), icon })).max(24),
        }),
      )
      .max(12),
  }),
  process: sectionHeader.extend({
    image,
    steps: z
      .array(
        z.object({
          number: required(8),
          title: required(120),
          description: longText(600),
        }),
      )
      .max(12),
  }),
  faq: z.object({
    title: required(200),
    searchPlaceholder: text(120),
    image,
    items: z
      .array(z.object({ question: required(300), answer: longText(2000) }))
      .max(40),
  }),
  cta: ctaBand,
});

// --------------------------------------------------------- testimonials ---

export const testimonialsSchema = z.object({
  enabled: z.boolean(),
  tag: required(120),
  title: required(300),
  description: longText(800),
  items: z
    .array(
      z.object({
        name: required(120),
        role: text(160),
        company: text(160),
        quote: longText(1200),
        rating: z.coerce.number().int().min(1).max(5),
        gradient: text(120),
      }),
    )
    .max(40),
});

// ------------------------------------------------------------- services ---

export const servicesSchema = z.object({
  banner,
  header: sectionHeader,
  items: z
    .array(
      z.object({
        slug: required(80),
        title: required(160),
        icon,
        teaser: longText(600),
        description: longText(2000),
        image,
        features: z.array(required(160)).max(20),
        tech: z.array(required(60)).max(24),
      }),
    )
    .max(40),
  cta: ctaBand,
});

// ------------------------------------------------------------- products ---

export const productsSchema = z.object({
  banner,
  header: sectionHeader,
  items: z
    .array(
      z.object({
        title: required(160),
        icon,
        badge: text(60),
        featured: z.boolean(),
        description: longText(2000),
        features: z.array(required(160)).max(20),
      }),
    )
    .max(60),
  cta: ctaBand,
});

// ------------------------------------------------------------- projects ---

export const projectsSchema = z.object({
  banner,
  header: sectionHeader,
  items: z
    .array(
      z.object({
        slug: required(80),
        title: required(200),
        icon,
        image,
        liveUrl: text(500),
        categories: z.array(required(80)).max(8),
        description: longText(2000),
        features: z.array(required(160)).max(20),
        tech: z.array(required(60)).max(24),
      }),
    )
    .max(60),
  cta: ctaBand,
});

// ----------------------------------------------------------------- team ---

export const teamSchema = z.object({
  banner,
  leadershipHeader: sectionHeader,
  groups: z
    .array(
      z.object({
        title: required(120),
        blurb: longText(600),
        layout: z.enum(["leadership", "default"]),
        members: z
          .array(
            z.object({
              name: required(120),
              role: required(160),
              bio: longText(800),
              gradient: text(120),
              image,
            }),
          )
          .max(40),
      }),
    )
    .max(12),
});

// ---------------------------------------------------------------- about ---

export const aboutSchema = z.object({
  banner,
  story: z.object({
    eyebrow: required(120),
    title: required(300),
    paragraphs: z.array(longText(1600)).max(8),
    image,
    imageAlt: text(300),
    primaryCta: cta,
    secondaryCta: cta,
    highlights: z
      .array(
        z.object({ icon, title: required(120), description: longText(400) }),
      )
      .max(12),
  }),
  foundation: z.object({
    eyebrow: required(120),
    title: required(300),
    description: longText(800),
    image,
    cards: z
      .array(
        z.object({
          label: required(8),
          title: required(120),
          body: longText(1600),
          icon,
          points: z.array(required(160)).max(10),
        }),
      )
      .max(8),
  }),
  values: z.object({
    eyebrow: required(120),
    title: required(300),
    description: longText(800),
    items: z
      .array(
        z.object({
          title: required(120),
          description: longText(800),
          icon,
          accent: color,
        }),
      )
      .max(24),
  }),
  different: z.object({
    eyebrow: required(120),
    title: required(300),
    description: longText(800),
    image,
    items: z
      .array(z.object({ title: required(160), body: longText(1600), icon }))
      .max(12),
    tiles: z.array(z.object({ icon, label: required(40) })).max(6),
  }),
  industries: z.object({
    eyebrow: required(120),
    title: required(300),
    description: longText(800),
    items: z
      .array(z.object({ title: required(120), icon, accent: color }))
      .max(24),
  }),
  cta: ctaBand,
});

// -------------------------------------------------------------- contact ---

export const contactSchema = z.object({
  banner,
  intro: z.object({
    title: required(300),
    description: longText(1200),
    socialsHeading: required(120),
  }),
  form: z.object({
    heading: required(200),
    description: longText(800),
    submitLabel: required(80),
    services: z
      .array(z.object({ value: required(80), label: required(120) }))
      .max(24),
  }),
  showMap: z.boolean(),
});

// --------------------------------------------------------------- registry -

export const contentSchemas = {
  site: siteSchema,
  home: homeSchema,
  testimonials: testimonialsSchema,
  services: servicesSchema,
  products: productsSchema,
  projects: projectsSchema,
  team: teamSchema,
  about: aboutSchema,
  contact: contactSchema,
} as const;

export type ContentSection = keyof typeof contentSchemas;

export const contentSections = Object.keys(contentSchemas) as ContentSection[];

export function isContentSection(value: unknown): value is ContentSection {
  return typeof value === "string" && value in contentSchemas;
}

export type ContentMap = {
  [K in ContentSection]: z.infer<(typeof contentSchemas)[K]>;
};

export type SiteContent = ContentMap["site"];
export type HomeContent = ContentMap["home"];
export type TestimonialsContent = ContentMap["testimonials"];
export type ServicesContent = ContentMap["services"];
export type ProductsContent = ContentMap["products"];
export type ProjectsContent = ContentMap["projects"];
export type TeamContent = ContentMap["team"];
export type AboutContent = ContentMap["about"];
export type ContactContent = ContentMap["contact"];

export type Service = ServicesContent["items"][number];
export type Product = ProductsContent["items"][number];
export type Project = ProjectsContent["items"][number];
export type TeamGroup = TeamContent["groups"][number];
export type TeamMember = TeamGroup["members"][number];
export type Testimonial = TestimonialsContent["items"][number];
export type Banner = z.infer<typeof banner>;
export type CtaBand = z.infer<typeof ctaBand>;
