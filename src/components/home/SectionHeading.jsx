const SectionHeading = ({ eyebrow, title, accent, text, light = false }) => (
  <div className="mx-auto max-w-2xl text-center">
    <span className="eyebrow">{eyebrow}</span>
    <h2
      className={`mt-4 text-4xl font-semibold leading-tight sm:text-5xl ${
        light ? 'text-white' : 'text-navy-900'
      }`}
    >
      {title} <span className="italic text-brand-600">{accent}</span>
    </h2>
    {text && (
      <p className={`mt-4 ${light ? 'text-white/70' : 'text-navy-800/70'}`}>{text}</p>
    )}
  </div>
)

export default SectionHeading
