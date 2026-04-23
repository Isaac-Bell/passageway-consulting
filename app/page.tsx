import Link from 'next/link';

const navItems = [
  { label: 'About', href: '#who-we-are', subitems: [{ label: 'Who we are', href: '#who-we-are' }] },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Book one on one', href: '#book-one-on-one' },
  {
    label: 'Resources',
    href: '#resources',
    subitems: [
      { label: 'Healing moments', href: '#healing-moments' },
      { label: 'Testimonies', href: '#testimonies' },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-softBeige text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/80 bg-softBeige/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <Link href="#hero" className="text-xl font-semibold text-slate-900">
              Passageway Consulting
            </Link>
            <p className="text-sm text-mutedGray">Connect. Heal. Empower.</p>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                <Link href={item.href} className="text-sm font-semibold text-slate-900 transition hover:text-primary">
                  {item.label}
                </Link>
                {item.subitems ? (
                  <div className="invisible absolute right-0 mt-3 w-44 rounded-3xl border border-slate-300/70 bg-white p-3 shadow-soft transition duration-200 group-hover:visible group-hover:opacity-100">
                    {item.subitems.map((subitem) => (
                      <Link
                        key={subitem.label}
                        href={subitem.href}
                        className="block rounded-2xl px-3 py-2 text-sm text-slate-700 transition hover:bg-lightBlue"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      </header>

      <section id="hero" className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-lightBlue px-4 py-2 text-sm font-semibold text-slate-900 shadow-soft">
              Empowering women through connection and healing
            </div>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                Create space for women to connect deeply, grow with confidence, and heal together.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Through our Connect and Empowerment workshops, we blend education with meaningful shared experiences, supporting women as they reclaim their voice, strengthen their sense of self, and step into their lives with clarity and empowerment.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#book-one-on-one" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Book one-on-one
              </a>
              <a href="#workshops" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400">
                Explore workshops
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/90 bg-white/80 p-8 shadow-soft backdrop-blur-sm lg:p-10">
            <div className="rounded-[1.75rem] bg-primary/80 p-8 text-white shadow-soft">
              <p className="text-sm uppercase tracking-[0.32em] text-white/90">Mission</p>
              <h2 className="mt-4 text-3xl font-semibold">We Support Women in Transition.</h2>
              <p className="mt-4 leading-7 text-white/90">
                Creating spaces where women can connect deeply, learn with confidence, and experience healing through community.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl bg-softPink p-6 text-slate-900 shadow-soft">
                <h3 className="font-semibold">Workshops</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">Guided sessions designed to foster growth, presence, and collaboration.</p>
              </div>
              <div className="rounded-3xl bg-beige p-6 text-slate-900 shadow-soft">
                <h3 className="font-semibold">One-on-One</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">Personalized support for women navigating their next chapter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="who-we-are" className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-grayBlue">About</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950">Who we are</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Passageway Consulting is a compassionate community partner for women seeking clarity, confidence, and sustainable healing. We design experiential workshops and one-on-one programs that help women reconnect with their truth and reclaim their power.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-lightBlue bg-softBeige p-8 shadow-soft">
              <h3 className="font-semibold text-slate-900">Guided Learning</h3>
              <p className="mt-4 text-sm leading-6 text-slate-700">Structured sessions rooted in care, presence, and practical guidance.</p>
            </div>
            <div className="rounded-[2rem] border border-lightBlue bg-softBeige p-8 shadow-soft">
              <h3 className="font-semibold text-slate-900">Community Healing</h3>
              <p className="mt-4 text-sm leading-6 text-slate-700">A safe environment where women can share, witness, and grow together.</p>
            </div>
            <div className="rounded-[2rem] border border-lightBlue bg-softBeige p-8 shadow-soft">
              <h3 className="font-semibold text-slate-900">Confidence Building</h3>
              <p className="mt-4 text-sm leading-6 text-slate-700">Practice tools and experiences that support women in stepping into their next chapter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="workshops" className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-grayBlue">Workshops</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950">Connect and Empowerment Workshops</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Each workshop invites women to explore emotional resilience, personal boundaries, and self-expression through guided exercises, conversation, and shared ritual.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-lightBlue bg-white p-8 shadow-soft">
                <h3 className="text-xl font-semibold text-slate-950">Connect Session</h3>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Build authentic relationships, reflect deeply, and experience the power of shared presence.
                </p>
              </div>
              <div className="rounded-[2rem] border border-lightBlue bg-white p-8 shadow-soft">
                <h3 className="text-xl font-semibold text-slate-950">Empowerment Circle</h3>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Practice tools for resilience, agency, and walking forward with intention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="book-one-on-one" className="border-t border-slate-200 bg-lightBlue/70 py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-white/95 p-10 shadow-soft lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-grayBlue">Book one-on-one</p>
                <h2 className="mt-4 text-4xl font-semibold text-slate-950">Personalized support to move forward with clarity.</h2>
                <p className="mt-6 text-lg leading-8 text-slate-600">
                  One-on-one sessions are designed to help you uncover what's next, reconnect to your confidence, and move through change with care.
                </p>
              </div>
              <div className="space-y-4 rounded-[2rem] bg-softBeige p-8 text-slate-900">
                <p className="text-sm uppercase tracking-[0.22em] text-grayBlue">Ready to begin?</p>
                <p className="text-xl font-semibold">Book a complimentary consultation to explore your needs and next steps.</p>
                <a href="mailto:hello@passagewayconsulting.com" className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Email us to book
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-grayBlue">Resources</p>
              <h2 className="mt-4 text-4xl font-semibold text-slate-950">Healing moments and testimonies</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Discover stories from women who have walked through our workshops and the moments that shaped their healing.
              </p>
            </div>
            <div className="grid gap-6">
              <div id="healing-moments" className="rounded-[2rem] bg-white p-8 shadow-soft">
                <h3 className="text-xl font-semibold text-slate-950">Healing Moments</h3>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Gentle practices and guided conversations that bring space for rest, release, and new understanding.
                </p>
              </div>
              <div id="testimonies" className="rounded-[2rem] bg-softPink p-8 shadow-soft">
                <h3 className="text-xl font-semibold text-slate-950">Testimonies</h3>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Stories from women who found clarity, reclaimed their voice, and stepped into fuller confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-grayBlue">Passageway Consulting</p>
            <p className="mt-3 text-sm text-slate-600">Support and guidance for women ready to connect, heal, and grow.</p>
          </div>
          <a href="mailto:hello@passagewayconsulting.com" className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            hello@passagewayconsulting.com
          </a>
        </div>
      </footer>
    </main>
  );
}
