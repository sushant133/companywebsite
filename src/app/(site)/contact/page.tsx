import type { Metadata } from "next";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import { ContactForm } from "@/components/site/contact-form";
import { Icon } from "@/components/site/icon";
import {
  Container,
  PageBanner,
  Section,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { RichHeading, plainText } from "@/components/site/rich-text";
import { getContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContent("contact");
  return {
    title: "Contact Us",
    description: contact.banner.description || plainText(contact.banner.title),
  };
}

export default async function ContactPage() {
  const [contact, site] = await Promise.all([
    getContent("contact"),
    getContent("site"),
  ]);

  return (
    <>
      <PageBanner banner={contact.banner} />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[60px]">
            <Reveal animation="fade-right">
              <h2 className="mb-4 text-[2.2rem]">
                <RichHeading text={contact.intro.title} />
              </h2>
              <p className="mb-10 leading-[1.8] text-slate-500">
                {contact.intro.description}
              </p>

              <div className="mb-10 flex flex-col gap-7">
                {site.contact.addressShort ? (
                  <InfoItem icon={<FaLocationDot />} title="Our Office">
                    <p className="whitespace-pre-line">
                      {site.contact.addressShort}
                    </p>
                  </InfoItem>
                ) : null}

                <InfoItem icon={<FaPhone />} title="Phone">
                  {site.contact.phones.map((phone) => (
                    <p key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="hover:text-brand"
                      >
                        {phone}
                      </a>
                    </p>
                  ))}
                </InfoItem>

                <InfoItem icon={<FaEnvelope />} title="Email">
                  <p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="hover:text-brand"
                    >
                      {site.contact.email}
                    </a>
                  </p>
                </InfoItem>

                <InfoItem icon={<FaClock />} title="Working Hours">
                  {site.contact.hoursLong.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </InfoItem>
              </div>

              <div>
                <h4 className="mb-4 text-base">
                  {contact.intro.socialsHeading}
                </h4>
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
            </Reveal>

            <Reveal animation="fade-left">
              <ContactForm form={contact.form} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {contact.showMap && site.contact.mapEmbedUrl ? (
        <section className="leading-[0]">
          <iframe
            title={`${site.name} office location`}
            src={site.contact.mapEmbedUrl}
            width="100%"
            height={450}
            style={{ border: 0, filter: "grayscale(30%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      ) : null}
    </>
  );
}

function InfoItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex size-[50px] shrink-0 items-center justify-center rounded-[14px] bg-brand/10 text-[1.2rem] text-brand">
        {icon}
      </div>
      <div className="text-[0.95rem] leading-[1.6] text-slate-500">
        <h4 className="mb-1 text-base text-ink">{title}</h4>
        {children}
      </div>
    </div>
  );
}
