import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/layout-primitives";
import { contactInfo, footerLinks, socialLinks } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:grid-cols-4 md:py-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt=""
                width={32}
                height={32}
                className="size-8 object-contain"
              />
              <span className="font-heading text-base font-semibold tracking-tight text-white">
                Mantra<span className="text-gradient-brand">Sphere</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-body text-slate-400">
              A software development studio in Siraha, Nepal. We build web and
              mobile products for businesses, and licence nine of our own.
            </p>
            <ul className="mt-6 flex items-center gap-1">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
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

          <FooterColumn title="Contact">
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-body text-slate-400 transition-colors hover:text-white"
              >
                {contactInfo.email}
              </a>
            </li>
            {contactInfo.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-body text-slate-400 transition-colors hover:text-white"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li className="pt-1 text-body whitespace-pre-line text-slate-400">
              {contactInfo.address}
            </li>
            <li className="text-body text-slate-500">{contactInfo.hours}</li>
          </FooterColumn>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} MantraSphere Innovations. All
            rights reserved.
          </p>
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
      <h2 className="section-label mb-4 text-slate-500">{title}</h2>
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
        className="text-body text-slate-400 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
