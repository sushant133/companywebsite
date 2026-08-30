import Link from "next/link";

import { LoginForm } from "@/components/admin/login-form";
import { countAdmins } from "@/lib/auth/admins";
import { env, isDatabaseConfigured } from "@/lib/env";

/**
 * One screen for both cases: signing in, and — on a fresh install where no
 * admin exists yet — creating the first owner account.
 */
export default async function AdminLoginPage(props: PageProps<"/admin/login">) {
  const { next } = await props.searchParams;
  const databaseConfigured = isDatabaseConfigured();

  let needsSetup = false;
  let databaseError = "";

  if (databaseConfigured) {
    try {
      needsSetup = (await countAdmins()) === 0;
    } catch (error) {
      console.error("[admin] could not reach MongoDB", error);
      databaseError =
        "The database could not be reached. Check MONGODB_URI and that this machine's IP is allowed in Atlas.";
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-ink px-5 py-12">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <span className="font-heading text-[1.7rem] font-extrabold text-gold">
            Mantra<span className="text-gradient-brand">Sphere</span>
          </span>
          <p className="mt-1.5 text-[0.9rem] text-slate-400">
            Content dashboard
          </p>
        </div>

        <div className="rounded-[20px] border border-white/10 bg-white p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.6)] md:p-9">
          {!databaseConfigured ? (
            <SetupNotice
              title="MongoDB is not configured"
              lines={[
                "Add your MongoDB Atlas connection string to .env.local as MONGODB_URI, then restart the dev server.",
                "AUTH_SECRET also has to be set to a random string of at least 32 characters.",
              ]}
            />
          ) : databaseError ? (
            <SetupNotice title="Cannot reach the database" lines={[databaseError]} />
          ) : (
            <LoginForm
              mode={needsSetup ? "setup" : "login"}
              nextPath={typeof next === "string" ? next : "/admin"}
              tokenRequired={needsSetup && env.setupToken.length > 0}
            />
          )}
        </div>

        <p className="mt-6 text-center text-[0.8rem] text-slate-500">
          <Link href="/" className="hover:text-slate-300">
            ← Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}

function SetupNotice({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <h1 className="mb-3 text-[1.3rem] font-bold text-ink">{title}</h1>
      {lines.map((line) => (
        <p key={line} className="mb-3 text-[0.9rem] leading-[1.75] text-slate-500">
          {line}
        </p>
      ))}
      <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-[0.75rem] leading-[1.7] text-slate-200">
{`MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net"
MONGODB_DB="mantrasphere"
AUTH_SECRET="a-random-string-of-at-least-32-characters"`}
      </pre>
    </div>
  );
}
