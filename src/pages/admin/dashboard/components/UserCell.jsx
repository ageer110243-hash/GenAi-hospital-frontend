// avatar + name + sub text (used in tables / lists)
const UserCell = ({ name, sub }) => (
  <div className="flex items-center gap-3">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-500 to-navy-800 text-sm font-bold text-white">
      {name.replace('Dr. ', '').split(' ').map((w) => w[0]).slice(0, 2).join('')}
    </span>
    <div className="min-w-0">
      <p className="truncate font-semibold text-navy-900">{name}</p>
      {sub && <p className="truncate text-xs text-navy-800/60">{sub}</p>}
    </div>
  </div>
)

export default UserCell
