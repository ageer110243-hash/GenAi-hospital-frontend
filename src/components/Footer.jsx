import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { NAV_LINKS, SITE } from '../data/site'

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency Care']
const socials = [Facebook, Twitter, Instagram, Linkedin]

const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-navy-950 text-white/70">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="space-y-5">
          <Logo light />
          <p className="text-sm leading-relaxed">
            Trusted healthcare delivered with compassion, precision and dignity — for every
            patient, every family, every day.
          </p>
          <div className="flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-400 hover:bg-gold-400 hover:text-navy-950"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="mb-5 font-display text-xl font-semibold text-white">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="transition hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Departments */}
        <div>
          <h4 className="mb-5 font-display text-xl font-semibold text-white">Departments</h4>
          <ul className="space-y-3 text-sm">
            {departments.map((d) => (
              <li key={d}>
                <Link to="/#services" className="transition hover:text-gold-300">
                  {d}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-5 font-display text-xl font-semibold text-white">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold-400" /> {SITE.address}
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="shrink-0 text-gold-400" /> {SITE.phone}
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="shrink-0 text-gold-400" /> {SITE.email}
            </li>
          </ul>
          <div className="mt-6 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="bg-gold-500 px-5 text-sm font-semibold text-navy-950 transition hover:bg-gold-400">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name} Hospital. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-300">Privacy Policy</a>
            <a href="#" className="hover:text-gold-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
