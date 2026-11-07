import { FileText, Download, FlaskConical, HeartPulse, ScanLine } from 'lucide-react'
import PageHeader from '../../../components/dashboard/PageHeader'

const reports = [
  { icon: FlaskConical, title: 'Complete Blood Count', doctor: 'Dr. Omar Siddiqui', date: '02 Oct 2026', type: 'Lab report' },
  { icon: HeartPulse, title: 'ECG Report', doctor: 'Dr. Ayesha Khan', date: '20 Oct 2026', type: 'Cardiology' },
  { icon: ScanLine, title: 'Chest X-Ray', doctor: 'Dr. Hamza Raza', date: '05 Sep 2026', type: 'Radiology' },
  { icon: FileText, title: 'Prescription - Asthma', doctor: 'Dr. Ayesha Khan', date: '20 Oct 2026', type: 'Prescription' },
  { icon: FlaskConical, title: 'Lipid Profile', doctor: 'Dr. Omar Siddiqui', date: '18 Aug 2026', type: 'Lab report' },
  { icon: FileText, title: 'Dental Check-up Summary', doctor: 'Dr. Sara Ahmed', date: '18 Jul 2026', type: 'Summary' },
]

const MedicalReports = () => (
  <>
    <PageHeader title="Medical reports" subtitle="Download your lab results, scans and prescriptions." />

    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {reports.map(({ icon: Icon, title, doctor, date, type }) => (
        <div key={title + date} className="group rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5">
          <div className="flex items-start justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-gold-500 group-hover:text-navy-950">
              <Icon size={22} />
            </span>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-navy-800/70">{type}</span>
          </div>
          <h3 className="mt-5 text-base font-bold">{title}</h3>
          <p className="mt-1 text-sm text-navy-800/60">{doctor}</p>
          <div className="mt-5 flex items-center justify-between border-t border-navy-900/5 pt-4">
            <span className="text-xs font-medium text-navy-800/50">{date}</span>
            <button className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 transition hover:text-brand-800">
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
)

export default MedicalReports
