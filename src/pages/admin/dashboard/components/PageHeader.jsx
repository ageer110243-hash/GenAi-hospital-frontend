const PageHeader = ({ title, subtitle, action }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-navy-800/60">{subtitle}</p>}
    </div>
    {action}
  </div>
)

export default PageHeader
