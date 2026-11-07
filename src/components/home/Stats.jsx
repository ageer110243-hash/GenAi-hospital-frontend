const stats = [
  { value: '25+', label: 'Years of service' },
  { value: '120+', label: 'Expert doctors' },
  { value: '25k+', label: 'Patients treated' },
  { value: '24/7', label: 'Emergency care' },
]

const Stats = () => (
  <section className="bg-ivory pb-4 pt-32">
    <div className="container-x">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-5xl font-bold text-brand-700">{s.value}</p>
            <p className="mt-1 text-sm uppercase tracking-widest text-navy-800/60">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Stats
