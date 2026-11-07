import { Quote, Star } from 'lucide-react'
import SectionHeading from './SectionHeading'

const reviews = [
  { name: 'Fatima Noor', text: 'From reception to recovery, every person treated me with kindness. I felt safe at every step.' },
  { name: 'Bilal Hussain', text: 'The cardiology team explained everything clearly and my surgery went perfectly. Truly world-class.' },
  { name: 'Mariam Ali', text: 'Our son was nervous, but the pediatric staff made him smile. We could not ask for better care.' },
]

const Testimonials = () => (
  <section id="reviews" className="relative overflow-hidden bg-navy-900 py-24">
    <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-600/25 blur-3xl" />
    <div className="container-x relative">
      <SectionHeading
        light
        eyebrow="Patient stories"
        title="Trusted by"
        accent="thousands of families"
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition hover:border-gold-400/50"
          >
            <Quote className="text-gold-400" size={30} />
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
              ))}
            </div>
            <blockquote className="mt-4 leading-relaxed text-white/80">{r.text}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500 font-semibold text-navy-950">
                {r.name[0]}
              </span>
              <span className="font-semibold text-white">{r.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
)

export default Testimonials
