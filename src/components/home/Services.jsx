import { Activity, Baby, Bone, Brain, HeartPulse, Siren } from 'lucide-react'
import SectionHeading from './SectionHeading'

const services = [
  { icon: HeartPulse, title: 'Cardiology', text: 'Advanced heart care, from prevention to complex interventions.' },
  { icon: Brain, title: 'Neurology', text: 'Expert diagnosis and treatment of brain, spine and nerve conditions.' },
  { icon: Bone, title: 'Orthopedics', text: 'Joint replacement, sports injury and rehabilitation programs.' },
  { icon: Baby, title: 'Pediatrics', text: 'Gentle, child-friendly care from newborns through adolescence.' },
  { icon: Activity, title: 'Oncology', text: 'Comprehensive cancer care with a compassionate, multi-disciplinary team.' },
  { icon: Siren, title: 'Emergency', text: 'Fully-equipped trauma and emergency unit, open 24 hours a day.' },
]

const Services = () => (
  <section id="services" className="bg-white py-24">
    <div className="container-x">
      <SectionHeading
        eyebrow="Our services"
        title="Specialised care for"
        accent="every need"
        text="Comprehensive medical services delivered by dedicated specialists."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-navy-900/5 bg-ivory p-8 transition duration-300 hover:-translate-y-1.5 hover:bg-navy-900 hover:shadow-2xl hover:shadow-navy-900/20"
          >
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-100 text-brand-700 transition group-hover:bg-gold-500 group-hover:text-navy-950">
              <Icon size={26} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold transition group-hover:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-800/70 transition group-hover:text-white/70">
              {text}
            </p>
            <a
              href="#"
              className="mt-5 inline-block text-sm font-semibold text-brand-700 transition group-hover:text-gold-300"
            >
              Learn more →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Services
