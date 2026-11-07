const tones = {
  teal: 'bg-brand-50 text-brand-700',
  gold: 'bg-gold-300/25 text-gold-600',
  navy: 'bg-navy-900/5 text-navy-800',
  red: 'bg-red-50 text-red-600',
}

const StatCard = ({ icon: Icon, label, value, note, tone = 'teal' }) => (
  <div className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-navy-900/5">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-navy-800/60">{label}</p>
        <p className="mt-2 text-3xl font-extrabold text-navy-900">{value}</p>
      </div>
      <span className={`grid h-12 w-12 place-items-center rounded-xl ${tones[tone]}`}>
        <Icon size={22} />
      </span>
    </div>
    {note && <p className="mt-4 text-xs font-semibold text-brand-600">{note}</p>}
  </div>
)

export default StatCard
