import "server-only";

/**
 * The MantraSphere marketing email. Written the way email has to be written
 * rather than the way the site is: nested tables, inline styles, a 600px shell
 * and a single-column stack, so it holds together from Gmail to Outlook. The
 * media query narrows the padding on phones; clients that ignore it still get
 * a readable single column because the shell is width-capped, not fixed.
 *
 * Gradients are painted over a solid brand colour, so a client that drops
 * `background-image` keeps white text on indigo instead of white on white.
 */

const BRAND = "#6366f1";
const BRAND_SKY = "#0ea5e9";
const INK = "#0f172a";
const GOLD = "#bf9149";
const BODY_BG = "#f1f5f9";
const TEXT = "#334155";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";

export type CampaignContent = {
  subject: string;
  /** The grey line most inboxes show after the subject. */
  preheader: string;
  heading: string;
  /** Blank-line separated; each block becomes a paragraph. */
  body: string;
  bullets: string[];
  ctaLabel: string;
  ctaUrl: string;
  /** Absolute URL of a banner image shown under the header. */
  imageUrl: string;
  footerNote: string;
};

export type CampaignBrand = {
  companyName: string;
  siteUrl: string;
  logoUrl: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  socials: { label: string; href: string }[];
  /** Where "unsubscribe" points. Empty hides the link. */
  unsubscribeUrl: string;
};

export type CampaignRecipient = { email: string; name?: string };

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]!);
}

/**
 * `{{name}}` and `{{email}}` are filled in per recipient. A recipient with no
 * name falls back to a neutral greeting rather than "Hi ,".
 */
export function personalize(text: string, recipient: CampaignRecipient): string {
  const name = recipient.name?.trim() || "there";
  return String(text ?? "")
    .replaceAll("{{name}}", name)
    .replaceAll("{{email}}", recipient.email);
}

function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

/** Relative paths are resolved against the site so images load in a mail client. */
export function absoluteUrl(value: string, siteUrl: string): string {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${siteUrl.replace(/\/+$/, "")}/${trimmed.replace(/^\/+/, "")}`;
}

export function renderCampaignHtml(
  content: CampaignContent,
  brand: CampaignBrand,
  recipient: CampaignRecipient,
): string {
  const fill = (value: string) => escapeHtml(personalize(value, recipient));

  const heroImage = absoluteUrl(content.imageUrl, brand.siteUrl);
  const logo = absoluteUrl(brand.logoUrl, brand.siteUrl);

  const bodyBlocks = paragraphs(content.body)
    .map(
      (block) => `
              <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:${TEXT};">
                ${fill(block).replace(/\n/g, "<br />")}
              </p>`,
    )
    .join("");

  const bulletRows = content.bullets
    .filter((item) => item.trim())
    .map(
      (item) => `
                  <tr>
                    <td width="26" valign="top" style="padding:0 0 12px;font-size:16px;line-height:1.6;color:${BRAND};">&#10003;</td>
                    <td valign="top" style="padding:0 0 12px;font-size:15px;line-height:1.6;color:${TEXT};">${fill(item)}</td>
                  </tr>`,
    )
    .join("");

  const bulletBlock = bulletRows
    ? `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 26px;background-color:#f8fafc;border:1px solid ${BORDER};border-radius:14px;">
                <tr>
                  <td style="padding:22px 24px 10px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${bulletRows}
                    </table>
                  </td>
                </tr>
              </table>`
    : "";

  const ctaBlock =
    content.ctaLabel.trim() && content.ctaUrl.trim()
      ? `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 8px;">
                <tr>
                  <td align="center" bgcolor="${BRAND}" style="border-radius:999px;background-color:${BRAND};background-image:linear-gradient(135deg,${BRAND},${BRAND_SKY});">
                    <a href="${escapeHtml(absoluteUrl(content.ctaUrl, brand.siteUrl))}"
                       style="display:inline-block;padding:15px 38px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px;">
                      ${fill(content.ctaLabel)}
                    </a>
                  </td>
                </tr>
              </table>`
      : "";

  const heroBlock = heroImage
    ? `
          <tr>
            <td style="padding:0;">
              <img src="${escapeHtml(heroImage)}" width="600" alt=""
                   style="display:block;width:100%;max-width:600px;height:auto;border:0;outline:none;text-decoration:none;" />
            </td>
          </tr>`
    : "";

  const socialLinks = brand.socials
    .filter((social) => social.href.trim())
    .map(
      (social) =>
        `<a href="${escapeHtml(social.href)}" style="color:${BRAND};text-decoration:none;font-size:13px;">${escapeHtml(social.label)}</a>`,
    )
    .join(`<span style="color:${BORDER};"> &nbsp;|&nbsp; </span>`);

  const unsubscribe = brand.unsubscribeUrl
    ? `<br /><a href="${escapeHtml(brand.unsubscribeUrl)}" style="color:${MUTED};text-decoration:underline;">Unsubscribe</a> from these updates.`
    : "";

  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${escapeHtml(content.subject)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  /* Phones: pull the generous desktop padding in so the copy keeps its measure. */
  @media only screen and (max-width:620px) {
    .ms-shell { width:100% !important; }
    .ms-pad { padding-left:22px !important; padding-right:22px !important; }
    .ms-head-pad { padding:26px 22px !important; }
    .ms-h1 { font-size:24px !important; line-height:1.3 !important; }
    .ms-stack { display:block !important; width:100% !important; text-align:center !important; }
  }
  a { color:${BRAND}; }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BODY_BG};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    ${fill(content.preheader)}
  </div>
  <!-- Some clients strip the preheader div but keep following whitespace; this pads it out. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BODY_BG};">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <table role="presentation" class="ms-shell" cellpadding="0" cellspacing="0" border="0" width="600"
               style="width:600px;max-width:600px;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 40px rgba(15,23,42,0.10);font-family:'Segoe UI',Arial,Helvetica,sans-serif;">

          <!-- Header -->
          <tr>
            <td class="ms-head-pad" bgcolor="${INK}"
                style="padding:30px 36px;background-color:${INK};background-image:linear-gradient(135deg,${INK} 0%,#1e293b 55%,#312e81 100%);">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    ${
                      logo
                        ? `<img src="${escapeHtml(logo)}" width="40" height="40" alt="" style="display:inline-block;vertical-align:middle;border:0;width:40px;height:40px;" />`
                        : ""
                    }
                    <span style="display:inline-block;vertical-align:middle;padding-left:10px;font-size:21px;font-weight:bold;color:${GOLD};letter-spacing:-0.3px;">
                      ${escapeHtml(brand.companyName)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:13px;line-height:1.6;color:#cbd5e1;">
                    ${escapeHtml(brand.tagline)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Brand rule -->
          <tr>
            <td height="4" bgcolor="${BRAND}"
                style="height:4px;line-height:4px;font-size:0;background-color:${BRAND};background-image:linear-gradient(90deg,${BRAND},${BRAND_SKY});">&nbsp;</td>
          </tr>
${heroBlock}
          <!-- Body -->
          <tr>
            <td class="ms-pad" style="padding:34px 36px 30px;">
              <h1 class="ms-h1" style="margin:0 0 8px;font-size:27px;line-height:1.25;color:${INK};font-weight:bold;letter-spacing:-0.4px;">
                ${fill(content.heading)}
              </h1>
              <p style="margin:0 0 22px;font-size:14px;color:${MUTED};">Hi ${escapeHtml(recipient.name?.trim() || "there")},</p>
${bodyBlocks}
${bulletBlock}
${ctaBlock}
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td class="ms-pad" style="padding:0 36px 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${BORDER};">
                <tr>
                  <td style="padding-top:20px;font-size:14px;line-height:1.7;color:${TEXT};">
                    ${fill(content.footerNote)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="ms-pad" bgcolor="#f8fafc" style="padding:26px 36px;background-color:#f8fafc;border-top:1px solid ${BORDER};">
              <p style="margin:0 0 8px;font-size:14px;font-weight:bold;color:${INK};">${escapeHtml(brand.companyName)}</p>
              <p style="margin:0 0 10px;font-size:13px;line-height:1.7;color:${MUTED};">
                ${escapeHtml(brand.address).replace(/\n/g, "<br />")}<br />
                ${
                  brand.phone
                    ? `<a href="tel:${escapeHtml(brand.phone.replace(/\s/g, ""))}" style="color:${MUTED};text-decoration:none;">${escapeHtml(brand.phone)}</a> &nbsp;&middot;&nbsp; `
                    : ""
                }<a href="mailto:${escapeHtml(brand.email)}" style="color:${MUTED};text-decoration:none;">${escapeHtml(brand.email)}</a>
              </p>
              ${socialLinks ? `<p style="margin:0 0 12px;">${socialLinks}</p>` : ""}
              <p style="margin:0;font-size:12px;line-height:1.7;color:#94a3b8;">
                You are receiving this because you contacted ${escapeHtml(brand.companyName)} or asked for our updates.${unsubscribe}
              </p>
            </td>
          </tr>
        </table>

        <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;font-family:Arial,Helvetica,sans-serif;">
          &copy; ${new Date().getFullYear()} ${escapeHtml(brand.companyName)}. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** The text/plain alternative. Sending without one is a spam-filter own goal. */
export function renderCampaignText(
  content: CampaignContent,
  brand: CampaignBrand,
  recipient: CampaignRecipient,
): string {
  const fill = (value: string) => personalize(value, recipient);
  const lines: string[] = [
    fill(content.heading),
    "",
    `Hi ${recipient.name?.trim() || "there"},`,
    "",
    ...paragraphs(content.body).map(fill),
  ];

  const bullets = content.bullets.filter((item) => item.trim());
  if (bullets.length) {
    lines.push("", ...bullets.map((item) => `* ${fill(item)}`));
  }

  if (content.ctaLabel.trim() && content.ctaUrl.trim()) {
    lines.push(
      "",
      `${fill(content.ctaLabel)}: ${absoluteUrl(content.ctaUrl, brand.siteUrl)}`,
    );
  }

  if (content.footerNote.trim()) lines.push("", fill(content.footerNote));

  lines.push(
    "",
    "--",
    brand.companyName,
    brand.address.replace(/\n/g, ", "),
    [brand.phone, brand.email].filter(Boolean).join(" | "),
    brand.siteUrl,
  );

  if (brand.unsubscribeUrl) {
    lines.push("", `Unsubscribe: ${brand.unsubscribeUrl}`);
  }

  return lines.join("\n");
}
