import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { Container, PageHeader, Section } from "@/components/site/layout-primitives";
import { contactInfo, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MantraSphere Innovations in Siraha, Nepal — by email, phone, WhatsApp, or the project enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Start a conversation"
        intro="Tell us roughly what you're planning. We'll come back within a working day with questions, a rough scope, and an honest read on whether we're the right team."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
            {/* Details first — plenty of people want the email address, not
                a form. Burying it under a nine-field form is a UX failure. */}
            <div>
              <dl className="divide-y divide-line border-y border-line">
                <ContactRow label="Email">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-fg underline underline-offset-4 decoration-line hover:decoration-brand"
                  >
                    {contactInfo.email}
                  </a>
                </ContactRow>

                <ContactRow label="Phone">
                  {contactInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-fg hover:text-brand"
                    >
                      {phone}
                    </a>
                  ))}
                </ContactRow>

                <ContactRow label="WhatsApp">
                  <a
                    href={contactInfo.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg underline underline-offset-4 decoration-line hover:decoration-brand"
                  >
                    Message us
                  </a>
                </ContactRow>

                <ContactRow label="Office">
                  <span className="whitespace-pre-line">
                    {contactInfo.address}
                  </span>
                </ContactRow>

                <ContactRow label="Hours">
                  {contactInfo.hoursLong.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </ContactRow>
              </dl>

              <ul className="mt-8 flex items-center gap-1">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-9 items-center justify-center rounded-md text-fg-subtle transition-colors hover:bg-surface-alt hover:text-fg"
                    >
                      <Icon className="size-[1.05rem]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>

      <section className="border-t border-line">
        <iframe
          title="MantraSphere Innovations office location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.0!2d86.4022092!3d26.7530571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eea372b09b1d4d%3A0xf68d8d47527c6963!2sMantraSphere%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp"
          width="100%"
          height={420}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block grayscale-[0.4]"
        />
      </section>
    </>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-4">
      <dt className="text-sm text-fg-subtle">{label}</dt>
      <dd className="text-[0.9375rem]">{children}</dd>
    </div>
  );
}
