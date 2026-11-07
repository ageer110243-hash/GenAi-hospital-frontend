import { Eye, Pencil, Trash2 } from 'lucide-react'

const RowActions = () => (
  <div className="flex items-center gap-1">
    <button className="grid h-9 w-9 place-items-center rounded-lg text-brand-700 transition hover:bg-brand-50" aria-label="View"><Eye size={16} /></button>
    <button className="grid h-9 w-9 place-items-center rounded-lg text-navy-800 transition hover:bg-navy-900/5" aria-label="Edit"><Pencil size={16} /></button>
    <button className="grid h-9 w-9 place-items-center rounded-lg text-red-600 transition hover:bg-red-50" aria-label="Delete"><Trash2 size={16} /></button>
  </div>
)

export default RowActions
