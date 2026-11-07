import { ArrowRight, CalendarCheck, ShieldCheck, Star, Stethoscope, Play } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-100 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-gold-300/30 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 pb-28 pt-14 lg:grid-cols-2 lg:pt-20">
        {/* Copy */}
        <div>
          <span className="eyebrow">Excellence in healthcare</span>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-navy-900 sm:text-6xl lg:text-7xl">
            Compassionate care,
            <span className="block italic text-brand-600">delivered with excellence.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-800/70">
            World-class specialists, modern technology and a team that treats you like family —
            all under one roof, around the clock.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#appointment" className="btn-primary">
              <CalendarCheck size={18} /> Book Appointment
            </a>
            <a href="#services" className="btn-outline">
              <Play size={16} className="text-brand-600" /> Explore Services
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-navy-800/80">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-brand-600" /> JCI-standard safety
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope size={20} className="text-brand-600" /> 120+ specialists
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="fill-gold-500 text-gold-500" /> 4.9 patient rating
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-4/5 overflow-hidden rounded-t-[12rem] rounded-b-3xl bg-linear-to-br from-brand-600 via-brand-800 to-navy-900 shadow-2xl shadow-navy-900/30">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
            <Stethoscope
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15"
              size={260}
              strokeWidth={1}
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-950/70 to-transparent p-8 pt-24">
              <p className="font-display text-2xl italic text-white">
                “Your health is our highest calling.”
              </p>
            </div>
          </div>

          {/* gold ring */}
          <div className="pointer-events-none absolute -right-5 -top-5 h-full w-full rounded-t-[12rem] rounded-b-3xl border border-gold-500/50" />

          {/* floating cards */}
          <div className="absolute -left-6 top-24 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl shadow-navy-900/10 sm:-left-12">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <CalendarCheck size={20} />
            </span>
            <div>
              <p className="text-xs text-navy-800/60">Next available</p>
              <p className="text-sm font-semibold">Today, 4:30 PM</p>
            </div>
          </div>

          <div className="absolute -right-4 bottom-32 rounded-2xl bg-white p-4 shadow-xl shadow-navy-900/10 sm:-right-10">
            <p className="font-display text-3xl font-bold text-brand-700">25k+</p>
            <p className="text-xs text-navy-800/60">Happy patients</p>
          </div>
        </div>
      </div>

      {/* Quick search bar overlapping next section */}
      <div id="appointment" className="container-x relative z-10 -mb-16 -mt-14">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 rounded-3xl border border-navy-900/5 bg-white p-5 shadow-2xl shadow-navy-900/10 md:grid-cols-4 md:p-6"
        >
          {[
            { label: 'Specialty', placeholder: 'e.g. Cardiology' },
            { label: 'Doctor', placeholder: 'Search by name' },
          ].map((f) => (
            <label key={f.label} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-800/60">
                {f.label}
              </span>
              <input
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-navy-900/10 bg-ivory px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-800/60">
              Date
            </span>
            <input
              type="date"
              className="w-full rounded-xl border border-navy-900/10 bg-ivory px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            />
          </label>
          <button className="btn-primary self-end py-3.5">
            Find a Doctor <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </section>
  )
}

export default Hero
