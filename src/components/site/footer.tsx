import Image from "next/image";
import Link from "next/link";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import { Icon } from "@/components/site/icon";
import { RichHeading, plainText } from "@/components/site/rich-text";
import type { Service, SiteContent } from "@/lib/content/schema";

export function Footer({
  site,
  services,
}: {
  site: SiteContent;
  services: Service[];
}) {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="pt-20 pb-10">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div>
              <Link href="/" className="mb-5 flex items-center gap-2.5">
                {site.logo ? (
                  <Image
                    src={site.logo}
                    alt={`${plainText(site.shortName)} logo`}
                    width={38}
                    height={38}
                    className="size-[38px] object-contain"
                  />
                ) : null}
                <RichHeading
                  text={site.shortName}
                  className="font-heading text-[1.3rem] font-extrabold text-gold"
                />
              </Link>
              <p className="mb-6 text-[0.95rem] leading-[1.8] text-slate-400">
                {site.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-[10px] bg-ink-2 text-slate-400 transition-all duration-300 hover:-translate-y-[3px] hover:bg-gradient-brand hover:text-white"
                  >
                    <Icon name={social.icon} className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Quick Links">
              {site.footerLinks.map((link) => (
                <FooterLink key={`${link.href}-${link.label}`} href={link.href}>
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

            <FooterColumn title="Contact Info">
              {site.contact.address ? (
                <li className="flex items-start gap-3">
                  <FaLocationDot className="mt-1 size-3.5 shrink-0 text-brand-light" />
                  <span className="text-[0.95rem] whitespace-pre-line">
                    {site.contact.address}
                  </span>
                </li>
              ) : null}
              {site.contact.phones.map((phone) => (
                <li key={phone} className="flex items-start gap-3">
                  <FaPhone className="mt-1 size-3.5 shrink-0 text-brand-light" />
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-[0.95rem] transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 size-3.5 shrink-0 text-brand-light" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[0.95rem] transition-colors hover:text-white"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="mt-1 size-3.5 shrink-0 text-brand-light" />
                <span className="text-[0.95rem]">{site.contact.hours}</span>
              </li>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-3 py-6">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center md:justify-between md:text-left">
            <p className="text-[0.9rem] text-slate-500">
              &copy; {new Date().getFullYear()} {site.name}. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
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
      <h3 className="relative mb-6 pb-3 text-[1.15rem] text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:rounded-[2px] after:bg-gradient-brand after:content-['']">
        {title}
      </h3>
      <ul className="space-y-3">{children}</ul>
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
        className="flex items-center gap-2 text-[0.95rem] text-slate-400 transition-all duration-300 hover:pl-1.5 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
