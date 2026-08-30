import type { Metadata } from "next";
import Link from "next/link";
import { FaCircleCheck, FaEnvelopeOpen } from "react-icons/fa6";

import { unsubscribeAction } from "@/app/(site)/unsubscribe/actions";
import { Container, Section } from "@/components/site/layout-primitives";
import { Button } from "@/components/ui/button";
import { getContent } from "@/lib/content/store";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Stop receiving marketing emails from MantraSphere Innovations.",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage(props: PageProps<"/unsubscribe">) {
  const { token, done } = await props.searchParams;
  const site = await getContent("site");

  const tokenValue = typeof token === "string" ? token : "";
  const finished = done === "1";

  return (
    <Section className="pt-[140px] md:pt-[180px]">
      <Container>
        <div className="mx-auto max-w-[560px] rounded-[20px] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_50px_-32px_rgb(15_23_42_/_0.4)] md:p-12">
          {finished ? (
            <>
              <FaCircleCheck className="mx-auto mb-5 text-[3rem] text-emerald-500" />
              <h1 className="mb-3 text-[1.7rem] text-ink">You are unsubscribed</h1>
              <p className="mb-8 leading-[1.8] text-slate-500">
                We will not send you any more marketing email. You will still
                hear from us if you write in about a project.
              </p>
            </>
          ) : (
            <>
              <FaEnvelopeOpen className="mx-auto mb-5 text-[3rem] text-brand" />
              <h1 className="mb-3 text-[1.7rem] text-ink">
                Unsubscribe from our updates?
              </h1>
              <p className="mb-8 leading-[1.8] text-slate-500">
                {tokenValue
                  ? `Confirm and ${site.name} will stop sending you marketing email.`
                  : "This link is missing its unsubscribe code. Open the link in the email again, or write to us and we will remove you."}
              </p>

              {tokenValue ? (
                <form action={unsubscribeAction} className="mb-8">
                  <input type="hidden" name="token" value={tokenValue} />
                  <Button type="submit" variant="brand" size="pill">
                    Yes, unsubscribe me
                  </Button>
                </form>
              ) : null}
            </>
          )}

          <p className="text-[0.9rem] text-slate-500">
            <Link href="/" className="font-semibold text-brand hover:underline">
              Back to {site.shortName}
            </Link>
            <span className="mx-2 text-slate-300">|</span>
            <a
              href={`mailto:${site.contact.email}`}
              className="font-semibold text-brand hover:underline"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
