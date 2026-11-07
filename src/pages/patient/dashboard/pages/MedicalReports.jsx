import { useState } from 'react'
import { FileText, Download, FlaskConical, HeartPulse, ScanLine } from 'lucide-react'
import PageHeader from '../components/PageHeader'

// Dummy data (remove when the API is connected)
const dummyReports = [
  { _id: '1', kind: 'lab', title: 'Complete Blood Count', doctor: 'Dr. Omar Siddiqui', date: '02 Oct 2026', type: 'Lab report' },
  { _id: '2', kind: 'heart', title: 'ECG Report', doctor: 'Dr. Ayesha Khan', date: '20 Oct 2026', type: 'Cardiology' },
  { _id: '3', kind: 'scan', title: 'Chest X-Ray', doctor: 'Dr. Hamza Raza', date: '05 Sep 2026', type: 'Radiology' },
  { _id: '4', kind: 'document', title: 'Prescription - Asthma', doctor: 'Dr. Ayesha Khan', date: '20 Oct 2026', type: 'Prescription' },
  { _id: '5', kind: 'lab', title: 'Lipid Profile', doctor: 'Dr. Omar Siddiqui', date: '18 Aug 2026', type: 'Lab report' },
  { _id: '6', kind: 'document', title: 'Dental Check-up Summary', doctor: 'Dr. Sara Ahmed', date: '18 Jul 2026', type: 'Summary' },
]


// report.kind -> icon
const icons = { lab: FlaskConical, heart: HeartPulse, scan: ScanLine, document: FileText }

const MedicalReports = () => {
  // eslint-disable-next-line no-unused-vars
  const [reports, setReports] = useState(dummyReports) // dummy data for now

  // TODO(API): replace the dummy data with a real request.
  // (add `import axios from 'axios'` and useEffect to the react import)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.get('http://localhost:8000/api/patient/reports', { withCredentials: true })
  //     setReports(data.reports)
  //   }
  //   fetchData()
  // }, [])

  return (
    <>
      <PageHeader title="Medical reports" subtitle="Download your lab results, scans and prescriptions." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => {
          const Icon = icons[r.kind] || FileText
          return (
            <div key={r._id} className="group rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                  <Icon size={22} />
                </span>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-navy-800/70">{r.type}</span>
              </div>
              <h3 className="mt-5 text-base font-bold">{r.title}</h3>
              <p className="mt-1 text-sm text-navy-800/60">{r.doctor}</p>
              <div className="mt-5 flex items-center justify-between border-t border-navy-900/5 pt-4">
                <span className="text-xs font-medium text-navy-800/50">{r.date}</span>
                {/* TODO(API): onClick -> download report */}
                <button className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 transition hover:text-brand-800">
                  <Download size={14} /> Download
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MedicalReports
