import type { Metadata } from "next";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

import { ContactForm } from "@/components/site/contact-form";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/site/layout-primitives";
import { Reveal } from "@/components/site/reveal";
import { contactInfo, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MantraSphere Innovations. Call, email, or send us a message about your project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" highlight="Us" crumb="Contact" />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-[60px]">
            <Reveal animation="fade-right">
              <h2 className="mb-4 text-[2.2rem]">
                Get In <span className="text-gradient-brand">Touch</span>
              </h2>
              <p className="mb-10 leading-[1.8] text-slate-500">
                Have a project in mind or want to learn more about our services?
                We&apos;d love to hear from you. Reach out and let&apos;s start a
                conversation.
              </p>

              <div className="mb-10 flex flex-col gap-7">
                <InfoItem icon={<FaLocationDot />} title="Our Office">
                  <p className="whitespace-pre-line">
                    {contactInfo.addressShort}
                  </p>
                </InfoItem>

                <InfoItem icon={<FaPhone />} title="Phone">
                  {contactInfo.phones.map((phone) => (
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
                    {/* The legacy markup was missing the mailto: scheme here,
                        which made this link resolve as a relative path. */}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-brand"
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                </InfoItem>

                <InfoItem icon={<FaClock />} title="Working Hours">
                  {contactInfo.hoursLong.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </InfoItem>
              </div>

              <div>
                <h4 className="mb-4 text-base">Contact Us</h4>
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
            </Reveal>

            <Reveal animation="fade-left">
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>

      <section className="leading-[0]">
        <iframe
          title="MantraSphere Innovations office location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.0!2d86.4022092!3d26.7530571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eea372b09b1d4d%3A0xf68d8d47527c6963!2sMantraSphere%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp"
          width="100%"
          height={450}
          style={{ border: 0, filter: "grayscale(30%)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
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
