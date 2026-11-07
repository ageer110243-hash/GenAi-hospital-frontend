import { Phone } from 'lucide-react'
import { SITE } from '../../data/site'

const CTA = () => (
  <section className="py-24">
    <div className="container-x">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand-700 via-brand-800 to-navy-900 px-8 py-16 text-center shadow-2xl shadow-brand-900/30 sm:px-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-gold-400/30" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full border border-white/10" />

        <h2 className="relative mx-auto max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Ready to take the <span className="italic text-gold-300">first step</span> toward better health?
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/75">
          Book an appointment in minutes or speak to our care team anytime.
        </p>
        <div className="relative mt-9 flex flex-wrap justify-center gap-4">
          <a href="#appointment" className="btn-gold">Book Appointment</a>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Phone size={16} /> {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  </section>
)

export default CTA
