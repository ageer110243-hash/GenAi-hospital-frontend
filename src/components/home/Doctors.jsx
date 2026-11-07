import { Star } from 'lucide-react'
import SectionHeading from './SectionHeading'

const doctors = [
  { name: 'Dr. Ayesha Khan', role: 'Cardiologist', exp: '15 yrs', initials: 'AK' },
  { name: 'Dr. Omar Siddiqui', role: 'Neurologist', exp: '12 yrs', initials: 'OS' },
  { name: 'Dr. Sara Ahmed', role: 'Pediatrician', exp: '10 yrs', initials: 'SA' },
  { name: 'Dr. Hamza Raza', role: 'Orthopedic Surgeon', exp: '18 yrs', initials: 'HR' },
]

const Doctors = () => (
  <section id="doctors" className="py-24">
    <div className="container-x">
      <SectionHeading
        eyebrow="Our specialists"
        title="Meet the doctors who"
        accent="care for you"
        text="Experienced, board-certified and committed to your wellbeing."
      />

      <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((d) => (
          <article
            key={d.name}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-navy-900/5 transition hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy-900/10"
          >
            <div className="relative grid h-60 place-items-center bg-linear-to-br from-brand-100 to-brand-200">
              <span className="grid h-28 w-28 place-items-center rounded-full bg-linear-to-br from-brand-600 to-navy-800 font-display text-4xl font-bold text-white ring-4 ring-white">
                {d.initials}
              </span>
              <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
                <Star size={12} className="fill-gold-500 text-gold-500" /> 4.9
              </span>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-600">{d.role}</p>
              <p className="text-xs text-navy-800/60">{d.exp} experience</p>
              <a href="#appointment" className="btn-outline mt-5 w-full py-2.5">
                Book now
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Doctors
