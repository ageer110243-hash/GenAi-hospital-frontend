import { CheckCircle2, HeartPulse } from 'lucide-react'

const points = [
  'Board-certified specialists across 30+ departments',
  'Advanced diagnostics & minimally-invasive surgery',
  'Transparent pricing and personalised care plans',
  'Private, comfortable rooms with round-the-clock nursing',
]

const About = () => (
  <section id="about" className="py-24">
    <div className="container-x grid items-center gap-16 lg:grid-cols-2">
      {/* Visual collage */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-5">
          <div className="aspect-3/4 rounded-3xl bg-linear-to-br from-brand-400 to-brand-700" />
          <div className="mt-12 aspect-3/4 rounded-3xl bg-linear-to-br from-navy-700 to-navy-950" />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory p-3 shadow-xl">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-gold-500 text-navy-950">
            <HeartPulse size={38} />
          </div>
        </div>
      </div>

      {/* Copy */}
      <div>
        <span className="eyebrow">About us</span>
        <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          A legacy of healing,
          <span className="italic text-brand-600"> a future of innovation.</span>
        </h2>
        <p className="mt-5 leading-relaxed text-navy-800/70">
          For over two decades, we have combined clinical excellence with genuine human
          warmth. Every patient receives the attention, respect and expertise they deserve.
        </p>

        <ul className="mt-8 space-y-4">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-navy-800">
              <CheckCircle2 className="mt-0.5 shrink-0 text-brand-600" size={20} />
              {p}
            </li>
          ))}
        </ul>

        <a href="#doctors" className="btn-primary mt-10">
          Meet our team
        </a>
      </div>
    </div>
  </section>
)

export default About
