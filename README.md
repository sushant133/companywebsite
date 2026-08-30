# MantraSphere

The MantraSphere company website, plus an admin dashboard that edits every word
and image on it. Next.js 16 (App Router), Tailwind v4, MongoDB Atlas.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill it in — see below
npm run dev
```

- Public site: <http://localhost:3000>
- Dashboard: <http://localhost:3000/admin>

### Environment

Every variable is documented in `.env.example`. The two that matter first:

| Variable | Needed for |
| --- | --- |
| `MONGODB_URI` | The dashboard. Without it the site still renders, from the defaults in `src/lib/content/defaults.ts`. |
| `AUTH_SECRET` | Signing admin sessions. At least 32 random characters. |
| `SMTP_*` | Contact-form notifications and bulk email. Optional. |

In Atlas, remember to allow your IP under **Network Access** — an otherwise
correct `MONGODB_URI` will just hang without it.

### First sign-in

With `MONGODB_URI` and `AUTH_SECRET` set, open `/admin`. Because no admin exists
yet, the login screen offers to create the first owner account and signs you in.
That form stops working the moment an account exists; further accounts are added
from **Settings**. Set `ADMIN_SETUP_TOKEN` in production so the first-run form is
not open to whoever finds the URL first.

## The dashboard

| Screen | What it does |
| --- | --- |
| Overview | Every content section, when each was last edited, and recent enquiries. |
| Content → *section* | Edits one section of the site: hero, services, products, projects, about, team, testimonials, contact details, navigation, footer. |
| Enquiries | Contact-form submissions, read/unread, deletable. |
| Subscribers | Who a campaign can go to. Contact-form senders land here automatically. |
| Bulk email | Composes one message and sends it to up to 100 people. |
| Settings | Your password, other admin accounts, SMTP status. |

Saving a section writes it to MongoDB and revalidates the site, so a change is
live on the next page load. **Restore defaults** deletes the stored document and
the page falls back to the copy in the repo.

### Images

Image fields upload straight to MongoDB (GridFS) and are served from
`/api/media/<id>`. Anything already under `public/` still works if you type its
path, as does an absolute URL.

### Bulk email

Each recipient gets their own message — nobody is CC'd, and the greeting is
personalised. `{{name}}` and `{{email}}` are substituted anywhere in the subject
or body. Every send carries a plain-text alternative and `List-Unsubscribe`
headers, and the footer unsubscribe link is per-recipient.

Limits, enforced server-side: 100 recipients per campaign, 5 campaigns per admin
per hour.

## How content works

1. `src/lib/content/schema.ts` — Zod schemas: what a valid section is. The same
   schemas validate what the dashboard sends and what comes back out of MongoDB.
2. `src/lib/content/defaults.ts` — the copy the site ships with. Also the
   fallback whenever the database is unset, unreachable, or holds something that
   no longer validates, so the public site cannot be taken down by a content
   problem.
3. `src/lib/content/fields.ts` — how each section is laid out in the editor.
4. `src/lib/content/store.ts` — reads and writes, merging stored documents over
   the defaults so a section saved before a field existed still renders.

To add a field: add it to the schema, give it a default, and add a `FieldSpec`
for it. The generic editor renders the rest.

## Security

- Passwords are bcrypt hashed (cost 12); login timing is equalised for unknown
  accounts.
- Sessions are HS256 JWTs in an `httpOnly`, `SameSite=Lax`, `secure`-in-production
  cookie, valid for 8 hours. A password change bumps a token version, which
  invalidates every older session.
- `src/proxy.ts` blocks unauthenticated requests before an admin page renders;
  each API route re-checks against the database, so a deleted account cannot
  keep working from an old token.
- Login, first-run setup, uploads and campaign sends are all rate limited.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```
