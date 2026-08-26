import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/layout-primitives";
import { contactInfo, footerLinks, siteConfig, socialLinks } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-alt">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-4 md:py-20">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              <span className="font-display text-[1.0625rem] font-semibold tracking-tight">
                Mantra<span className="text-gradient-brand">Sphere</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Software development studio in Siraha, Nepal. We build web and
              mobile products, and licence nine of our own.
            </p>
          </div>

          <FooterColumn title="Company">
            {footerLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <FooterLink key={service.slug} href="/services">
                {service.title}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {contactInfo.email}
              </a>
            </li>
            {contactInfo.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li className="pt-1 text-sm whitespace-pre-line text-fg-muted">
              {contactInfo.address}
            </li>
            <li className="text-sm text-fg-subtle">{contactInfo.hours}</li>
          </FooterColumn>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-7 sm:flex-row sm:items-center">
          <p className="text-sm text-fg-subtle">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <ul className="flex items-center gap-1">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface hover:text-fg"
                >
                  <Icon className="size-[1.05rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-eyebrow mb-4 uppercase text-fg-subtle">{title}</h2>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        {children}
      </Link>
    </li>
  );
}
