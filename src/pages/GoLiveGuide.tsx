import { ReactNode } from 'react';
import { CreditCard, MessageSquare, CheckCircle2, ExternalLink, Send } from 'lucide-react';

const Step = ({ n, title, children }: { n: number; title: string; children: ReactNode }) => (
  <li className="relative pl-11">
    <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600 text-sm font-bold text-white">
      {n}
    </span>
    <h4 className="mt-1 font-semibold text-gray-900">{title}</h4>
    <div className="mt-1 space-y-2 text-sm leading-relaxed text-gray-600">{children}</div>
  </li>
);

const Callout = ({ children }: { children: ReactNode }) => (
  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm leading-relaxed text-yellow-900">
    {children}
  </div>
);

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 font-semibold text-yellow-700 hover:underline"
  >
    {children} <ExternalLink size={13} />
  </a>
);

const GoLiveGuide = () => (
  <section className="min-h-[calc(100vh-5rem)] bg-[#fcfaf6] py-12 sm:py-16">
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="rounded-[2rem] bg-stone-950 px-6 py-10 text-white sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">Alicia Hairline &amp; Beauty</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Taking the website live</h1>
        <p className="mt-4 max-w-xl text-stone-300">
          Two features on the site — <strong className="text-white">card payments</strong> and{' '}
          <strong className="text-white">automatic SMS</strong> to booking clients — are fully built and
          tested. To switch them from test mode to real money and real texts, you need to open two
          accounts and send me the details. This page walks you through it.
        </p>
      </header>

      {/* Overview */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <MessageSquare className="text-yellow-600" size={24} />
          <h3 className="mt-3 font-bold text-gray-900">Africa's Talking</h3>
          <p className="mt-1 text-sm text-gray-600">
            Sends the "your appointment is confirmed / cancelled" text to clients who book online.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <CreditCard className="text-yellow-600" size={24} />
          <h3 className="mt-3 font-bold text-gray-900">Pesapal</h3>
          <p className="mt-1 text-sm text-gray-600">
            Lets customers pay for products with a Visa/Mastercard on the website. Money settles to
            your KCB account.
          </p>
        </div>
      </div>

      {/* PART 1 — Africa's Talking */}
      <div className="mt-10 rounded-[2rem] border border-yellow-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-yellow-600" size={26} />
          <h2 className="text-2xl font-bold text-gray-900">Part 1 · Africa's Talking (SMS)</h2>
        </div>

        <ol className="mt-6 space-y-7">
          <Step n={1} title="Create the account">
            <p>
              Go to <ExtLink href="https://account.africastalking.com/">account.africastalking.com</ExtLink>{' '}
              and sign up with the salon email. Verify the email, then log in.
            </p>
          </Step>

          <Step n={2} title="Top up the wallet">
            <p>
              Click <strong>Topup Balance</strong> and load some airtime credit (KES 1,000 is plenty to
              start). Each SMS costs roughly KES 0.80.
            </p>
          </Step>

          <Step n={3} title="Get your username and a live API key">
            <p>
              On the dashboard you'll see an app — the name shown under the salon name (e.g.{' '}
              <code className="rounded bg-gray-100 px-1">alicia_hairline</code>) is your{' '}
              <strong>username</strong>. Open that app → <strong>Settings → API Key</strong> →{' '}
              <strong>Generate</strong>, and copy the key immediately (it's shown once).
            </p>
            <Callout>
              Use the key from your <strong>own app</strong>, not the "sandbox" one. Generating a new
              key cancels the previous one, so only generate it when you're ready to copy it.
            </Callout>
          </Step>

          <Step n={4} title="Request a Sender ID (the name texts come from)">
            <p>
              In the dashboard, find <strong>SMS → Sender IDs → Create</strong>. Ask for a short name,
              max 11 characters, letters only — e.g. <code className="rounded bg-gray-100 px-1">AliciaHair</code>.
              Say the use is <em>transactional — appointment confirmations to our own booking
              customers</em>, and give a couple of example messages.
            </p>
            <Callout>
              Safaricom / Airtel review this and it takes <strong>1–3 business days</strong>. Until
              it's approved, texts to normal numbers are blocked, so this step is what actually turns
              SMS on. Start it early.
            </Callout>
          </Step>

          <Step n={5} title="Send me three things">
            <p>Once the Sender ID is approved, send me:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Your <strong>username</strong></li>
              <li>Your <strong>live API key</strong></li>
              <li>Your approved <strong>Sender ID</strong></li>
            </ul>
            <p>
              I plug these into the website's SMS settings, switch it from test mode to live, and turn
              on client SMS. After that, every confirmed/cancelled online booking texts the client
              automatically (you can still review/edit each message before it sends).
            </p>
          </Step>
        </ol>
      </div>

      {/* PART 2 — Pesapal */}
      <div className="mt-8 rounded-[2rem] border border-yellow-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <CreditCard className="text-yellow-600" size={26} />
          <h2 className="text-2xl font-bold text-gray-900">Part 2 · Pesapal (card payments)</h2>
        </div>

        <ol className="mt-6 space-y-7">
          <Step n={1} title="Create a merchant account">
            <p>
              Go to <ExtLink href="https://www.pesapal.com/">pesapal.com</ExtLink> and register as a
              business/merchant with the salon details.
            </p>
          </Step>

          <Step n={2} title="Complete verification (KYC)">
            <p>
              Pesapal will ask for business registration details and an ID. This is a one-time check
              and usually clears in a couple of days.
            </p>
          </Step>

          <Step n={3} title="Add your KCB settlement account">
            <p>
              In the dashboard, add the <strong>KCB bank account</strong> where card payments should be
              paid out. This is where the money from every sale lands.
            </p>
          </Step>

          <Step n={4} title="Get your live API keys">
            <p>
              Dashboard → <strong>Account → API Keys</strong>. There's a <strong>sandbox</strong>{' '}
              (test) pair and a <strong>live</strong> pair — copy the <strong>Consumer Key</strong> and{' '}
              <strong>Consumer Secret</strong> from the <strong>live</strong> section.
            </p>
          </Step>

          <Step n={5} title="Set your product prices">
            <p>
              The shop can only sell items that have a price. Make sure every product you want to sell
              online has its price entered in the system (or send me a price list and I'll do a bulk
              update). Items with no price are turned away at checkout.
            </p>
          </Step>

          <Step n={6} title="Send me two things">
            <p>Send me:</p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Your live <strong>Consumer Key</strong></li>
              <li>Your live <strong>Consumer Secret</strong></li>
            </ul>
            <p>
              I switch the website to live mode and re-register it with Pesapal. Then we do{' '}
              <strong>one small real purchase</strong> together (buy a cheap item, pay with a real
              card) to confirm the money reaches your KCB account.
            </p>
          </Step>
        </ol>
      </div>

      {/* Checklist */}
      <div className="mt-8 rounded-[2rem] bg-stone-950 p-6 text-white sm:p-8">
        <div className="flex items-center gap-3">
          <Send className="text-yellow-300" size={22} />
          <h2 className="text-xl font-bold">What to send me, in one message</h2>
        </div>
        <div className="mt-5 space-y-4 text-sm">
          <div>
            <p className="font-semibold text-yellow-300">Africa's Talking</p>
            <ul className="mt-1 space-y-1 text-stone-300">
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stone-500" /> Username</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stone-500" /> Live API key</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stone-500" /> Approved Sender ID</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-yellow-300">Pesapal</p>
            <ul className="mt-1 space-y-1 text-stone-300">
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stone-500" /> Live Consumer Key</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stone-500" /> Live Consumer Secret</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-stone-500" /> Confirmation that KYC is done and the KCB account is added</li>
            </ul>
          </div>
        </div>
        <p className="mt-6 text-xs text-stone-400">
          Treat the API keys like passwords — send them to me directly, not in a group chat, and
          don't post them anywhere public.
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        Rough timeline: Africa's Talking is usable in a few hours except the Sender ID (1–3 days).
        Pesapal is 2–4 days for verification. Start both now and they'll be ready around the same time.
      </p>
    </div>
  </section>
);

export default GoLiveGuide;
