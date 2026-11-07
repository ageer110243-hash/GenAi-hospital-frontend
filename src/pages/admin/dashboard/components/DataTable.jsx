import { Search } from 'lucide-react'

// columns: [{ key, label, render?(row) }]   rows: [{...}]
const DataTable = ({ columns, rows, searchPlaceholder = 'Search...', showToolbar = true }) => (
  <div className="overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm">
    {showToolbar && (
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-900/5 p-5">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-800/40" />
          <input
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-navy-900/10 bg-surface py-2.5 pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <p className="text-xs font-medium text-navy-800/50">{rows.length} records</p>
      </div>
    )}

    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-surface text-xs uppercase tracking-wider text-navy-800/60">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-6 py-4 font-bold">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-900/5">
          {rows.map((row, i) => (
            <tr key={i} className="transition hover:bg-brand-50/40">
              {columns.map((c) => (
                <td key={c.key} className="px-6 py-4 text-navy-800">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {showToolbar && (
      <div className="flex items-center justify-between border-t border-navy-900/5 p-5 text-sm text-navy-800/60">
        <span>Page 1 of 5</span>
        <div className="flex gap-2">
          <button className="rounded-lg border border-navy-900/10 px-4 py-1.5 font-semibold transition hover:border-brand-600 hover:text-brand-700">Previous</button>
          <button className="rounded-lg bg-brand-700 px-4 py-1.5 font-semibold text-white transition hover:bg-brand-800">Next</button>
        </div>
      </div>
    )}
  </div>
)

export default DataTable
