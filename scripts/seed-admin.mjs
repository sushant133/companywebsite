/**
 * Creates or resets an admin account straight in MongoDB, without going through
 * the first-run form. Useful for seeding a demo login, and for getting back in
 * when the only account's password has been lost.
 *
 * Run it with Node's own env-file support so it reads the same config the app does:
 *
 *   node --env-file=.env.local scripts/seed-admin.mjs
 *   node --env-file=.env.local scripts/seed-admin.mjs --email you@co.com --password 'S3cret...' --name 'You'
 *
 * Re-running for an existing email resets that account's password rather than
 * failing, which also bumps its token version and signs out its open sessions.
 */

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

// Kept in step with src/lib/auth/password.ts and src/lib/auth/admins.ts.
const BCRYPT_ROUNDS = 12;
const COLLECTION = "admins";

const DEFAULTS = {
  email: "demo@mantrasphere.com",
  password: "MantraDemo2026!",
  name: "Demo Admin",
  role: "owner",
};

function parseArgs(argv) {
  const args = { ...DEFAULTS };
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, "");
    const value = argv[i + 1];
    if (key && value && key in args) args[key] = value;
  }
  return args;
}

/** The same rules the dashboard enforces, so a seeded account can sign in. */
function checkPassword(password) {
  const problems = [];
  if (password.length < 10) problems.push("at least 10 characters");
  if (!/[a-z]/.test(password)) problems.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) problems.push("an uppercase letter");
  if (!/[0-9]/.test(password)) problems.push("a number");
  return problems;
}

const args = parseArgs(process.argv.slice(2));
const uri = process.env.MONGODB_URI?.trim();
const dbName = process.env.MONGODB_DB?.trim() || "mantrasphere";

if (!uri) {
  console.error(
    "MONGODB_URI is not set.\n" +
      "Add your Atlas connection string to .env.local, then run:\n" +
      "  node --env-file=.env.local scripts/seed-admin.mjs",
  );
  process.exit(1);
}

if (args.role !== "owner" && args.role !== "editor") {
  console.error(`--role must be "owner" or "editor", got "${args.role}".`);
  process.exit(1);
}

const problems = checkPassword(args.password);
if (problems.length > 0) {
  console.error(`That password needs ${problems.join(", ")}.`);
  process.exit(1);
}

const email = args.email.trim().toLowerCase();
const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });

try {
  await client.connect();
  const admins = client.db(dbName).collection(COLLECTION);
  await admins.createIndex({ email: 1 }, { unique: true });

  const now = new Date();
  const passwordHash = await bcrypt.hash(args.password, BCRYPT_ROUNDS);
  const existing = await admins.findOne({ email });

  if (existing) {
    await admins.updateOne(
      { _id: existing._id },
      {
        $set: { passwordHash, name: args.name, role: args.role, updatedAt: now },
        // Bumped so any session issued before this reset stops verifying.
        $inc: { tokenVersion: 1 },
      },
    );
    console.log(`Reset the existing account for ${email}.`);
  } else {
    await admins.insertOne({
      email,
      name: args.name,
      passwordHash,
      role: args.role,
      tokenVersion: 1,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`Created a new ${args.role} account.`);
  }

  console.log("");
  console.log("  Sign in at http://localhost:3000/admin");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${args.password}`);
  console.log("");
  console.log(`Accounts in the database: ${await admins.countDocuments()}`);
  console.log("Change this password from Settings before the site goes live.");
} catch (error) {
  console.error("Could not reach MongoDB.");
  console.error(error instanceof Error ? error.message : error);
  console.error(
    "\nCheck MONGODB_URI, that the password in it is URL-encoded, and that " +
      "this machine's IP is allowed under Network Access in Atlas.",
  );
  process.exitCode = 1;
} finally {
  await client.close();
}
