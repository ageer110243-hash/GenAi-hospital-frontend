import { useEffect, useState } from 'react'
import { Check, Eye, Pencil, Trash2, X } from 'lucide-react'

// Eye icon: if onApprove / onReject are given, clicking the eye opens a small
// menu with "Approve" and "Reject". Edit and Delete icons stay as they are.
const RowActions = ({ onApprove, onReject, canApprove = true, canReject = true }) => {
  const [menu, setMenu] = useState(null) // { top, left } while the menu is open
  const hasMenu = Boolean(onApprove || onReject)

  // close the menu on outside click, scroll or resize
  useEffect(() => {
    if (!menu) return
    const close = () => setMenu(null)
    window.addEventListener('click', close)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('click', close)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [menu])

  const toggleMenu = (e) => {
    e.stopPropagation()
    if (menu) return setMenu(null)
    const rect = e.currentTarget.getBoundingClientRect()
    setMenu({ top: rect.bottom + 6, left: Math.min(rect.left, window.innerWidth - 176) })
  }

  const choose = (action) => {
    setMenu(null)
    action()
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={hasMenu ? toggleMenu : undefined}
        className="grid h-9 w-9 place-items-center rounded-lg text-brand-700 transition hover:bg-brand-50"
        aria-label="View"
      >
        <Eye size={16} />
      </button>
      <button className="grid h-9 w-9 place-items-center rounded-lg text-navy-800 transition hover:bg-navy-900/5" aria-label="Edit"><Pencil size={16} /></button>
      <button className="grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50" aria-label="Delete"><Trash2 size={16} /></button>

      {menu && (
        <div
          style={{ top: menu.top, left: menu.left }}
          className="fixed z-50 w-44 overflow-hidden rounded-xl border border-navy-900/10 bg-white p-1.5 shadow-xl shadow-navy-900/10"
        >
          {onApprove && (
            <button
              disabled={!canApprove}
              onClick={() => choose(onApprove)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <Check size={16} /> Approve
            </button>
          )}
          {onReject && (
            <button
              disabled={!canReject}
              onClick={() => choose(onReject)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <X size={16} /> Reject
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default RowActions