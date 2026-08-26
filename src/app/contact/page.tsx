import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import {
  Container,
  PageHeader,
  Section,
} from "@/components/site/layout-primitives";
import { contactInfo, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MantraSphere Innovations in Siraha, Nepal — by email, phone, WhatsApp or the project enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Tell us what you're"
        highlight="planning to build"
        intro="Send the outline and we'll come back within one working day with questions, a rough scope, and a straight answer on whether we're the right team for it."
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Contact details come first. Plenty of people want the email
                address rather than a nine-field form, and burying it below
                one is a needless obstacle. */}
            <div>
              <dl className="divide-y divide-slate-200 border-y border-slate-200">
                <Row label="Email">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-medium text-ink underline decoration-slate-300 underline-offset-4 transition-colors hover:decoration-brand"
                  >
                    {contactInfo.email}
                  </a>
                </Row>

                <Row label="Phone">
                  {contactInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-slate-700 transition-colors hover:text-brand-strong"
                    >
                      {phone}
                    </a>
                  ))}
                </Row>

                <Row label="WhatsApp">
                  <a
                    href={contactInfo.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-brand-strong"
                  >
                    Send a message
                  </a>
                </Row>

                <Row label="Office">
                  <span className="whitespace-pre-line text-slate-700">
                    {contactInfo.addressShort}
                  </span>
                </Row>

                <Row label="Hours">
                  {contactInfo.hoursLong.map((line) => (
                    <span key={line} className="block text-slate-700">
                      {line}
                    </span>
                  ))}
                </Row>
              </dl>

              <ul className="mt-7 flex items-center gap-1">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section>

      <section className="border-t border-slate-200">
        <iframe
          title="MantraSphere Innovations office location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.0!2d86.4022092!3d26.7530571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eea372b09b1d4d%3A0xf68d8d47527c6963!2sMantraSphere%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1710000000000!5m2!1sen!2snp"
          width="100%"
          height={400}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block grayscale-[0.3]"
        />
      </section>
    </>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-body">{children}</dd>
    </div>
  );
}
