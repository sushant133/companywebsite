import Image from "next/image";
import Link from "next/link";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import { contactInfo, footerLinks, siteConfig, socialLinks } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="pt-20 pb-10">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
            <div>
              <Link href="/" className="mb-5 flex items-center gap-2.5">
                <Image
                  src="/images/logo.png"
                  alt="MantraSphere Logo"
                  width={38}
                  height={38}
                  className="size-[38px] object-contain"
                />
                <span className="font-heading text-[1.3rem] font-extrabold text-gold">
                  Mantra<span className="text-gradient-brand">Sphere</span>
                </span>
              </Link>
              <p className="mb-6 text-[0.95rem] leading-[1.8] text-slate-400">
                {siteConfig.description}
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-10 items-center justify-center rounded-[10px] bg-ink-2 text-slate-400 transition-all duration-300 hover:-translate-y-[3px] hover:bg-gradient-brand hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>

            <FooterColumn title="Quick Links">
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

            <FooterColumn title="Contact Info">
              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-1 size-3.5 shrink-0 text-brand-light" />
                <span className="text-[0.95rem] whitespace-pre-line">
                  {contactInfo.address}
                </span>
              </li>
              {contactInfo.phones.map((phone) => (
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
                <span className="text-[0.95rem]">{contactInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="mt-1 size-3.5 shrink-0 text-brand-light" />
                <span className="text-[0.95rem]">{contactInfo.hours}</span>
              </li>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-3 py-6">
        <div className="mx-auto w-full max-w-[1200px] px-5">
          <div className="flex flex-wrap items-center justify-center gap-4 text-center md:justify-between md:text-left">
            <p className="text-[0.9rem] text-slate-500">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights
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
