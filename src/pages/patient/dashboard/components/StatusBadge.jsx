const styles = {
  Approved: 'bg-brand-50 text-brand-700 ring-brand-200',
  Completed: 'bg-brand-50 text-brand-700 ring-brand-200',
  Confirmed: 'bg-navy-900/5 text-navy-800 ring-navy-900/15',
  Pending: 'bg-gold-300/25 text-gold-600 ring-gold-400/50',
  Cancelled: 'bg-red-50 text-red-700 ring-red-200',
  Rejected: 'bg-red-50 text-red-700 ring-red-200',
}

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
      styles[status] || 'bg-navy-900/5 text-navy-800 ring-navy-900/10'
    }`}
  >
    {status}
  </span>
)

export default StatusBadge
