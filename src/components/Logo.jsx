import { Link } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import { SITE } from '../data/site'

const Logo = ({ light = false }) => (
  <Link to="/" className="flex items-center gap-3">
    <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-brand-500 to-brand-800 text-white shadow-md ring-2 ring-gold-400/60">
      <HeartPulse size={22} />
    </span>
    <span className="leading-none">
      <span
        className={`block font-display text-2xl font-bold tracking-wide ${
          light ? 'text-white' : 'text-navy-900'
        }`}
      >
        {SITE.name}
      </span>
      <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-500">
        {SITE.tagline}
      </span>
    </span>
  </Link>
)

export default Logo
