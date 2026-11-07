import { useState } from 'react'
import { Camera, Pencil } from 'lucide-react'
import PageHeader from './PageHeader'

const fieldClass =
  'w-full rounded-xl border border-navy-900/10 bg-surface px-4 py-3 text-sm text-navy-900 placeholder:text-navy-800/40 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 read-only:cursor-default read-only:focus:border-navy-900/10 read-only:focus:bg-surface read-only:focus:ring-0 disabled:cursor-default disabled:opacity-100'

// 'A' -> { value: 'A', label: 'A' }   |   { value, label } stays as it is
const toOption = (o) => (typeof o === 'string' ? { value: o, label: o } : o)

/**
 * props:
 *  - name, role, email : shown in the left card
 *  - fields            : [{ name, label, type?, placeholder?, options?, full? }]
 *                        options can be ['A','B'] or [{ value: 'a', label: 'A' }] (value is what is saved)
 *  - values            : object used to FILL the form (e.g. the patient from the API)
 *  - onSubmit(formData): called on "Save changes". Return true when the update worked
 *                        (the form locks again) or false when it failed (stays open)
 *  - status            : { type: 'success' | 'error', text } message shown above the buttons
 *  - onEditStart()     : called when "Edit profile" is clicked (e.g. to clear the message)
 */
const ProfilePage = ({ name, role, email, fields, values = {}, onSubmit, status, onEditStart }) => {
  const [editing, setEditing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // all inputs/selects -> { fieldName: value }
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    const ok = await onSubmit?.(formData)
    if (ok !== false) setEditing(false)
  }

  const startEdit = () => {
    onEditStart?.()
    setEditing(true)
  }

  const cancelEdit = (e) => {
    e.currentTarget.form.reset() // back to the saved values
    setEditing(false)
  }

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information."
        action={
          !editing && (
            <button type="button" onClick={startEdit} className="btn-primary rounded-xl">
              <Pencil size={16} /> Edit profile
            </button>
          )
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* avatar card */}
        <div className="h-fit rounded-2xl border border-navy-900/5 bg-white p-8 text-center shadow-sm">
          <div className="relative mx-auto h-28 w-28">
            <span className="grid h-28 w-28 place-items-center rounded-3xl bg-linear-to-br from-brand-500 to-navy-800 text-4xl font-extrabold text-white">
              {name.replace('Dr. ', '')[0]}
            </span>
            <button type="button" className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl bg-gold-500 text-navy-950 shadow-lg transition hover:bg-gold-400" aria-label="Change photo">
              <Camera size={16} />
            </button>
          </div>
          <h2 className="mt-6 text-xl font-bold">{name}</h2>
          <p className="text-sm font-semibold text-brand-600">{role}</p>
          <p className="mt-1 text-sm text-navy-800/60">{email}</p>
        </div>

        {/* form card */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm sm:p-8 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Personal information</h2>
            {editing && (
              <span className="rounded-full bg-gold-300/25 px-3 py-1 text-xs font-bold text-gold-600">Editing</span>
            )}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
                <label htmlFor={f.name} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-800/60">
                  {f.label}
                </label>
                {f.options ? (
                  <select
                    id={f.name}
                    name={f.name}
                    defaultValue={values[f.name] ?? toOption(f.options[0]).value}
                    disabled={!editing}
                    className={`${fieldClass} appearance-none`}
                  >
                    {f.options.map(toOption).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type || 'text'}
                    defaultValue={values[f.name] ?? ''}
                    placeholder={f.placeholder}
                    readOnly={!editing}
                    className={fieldClass}
                  />
                )}
              </div>
            ))}
          </div>

          {status && (
            <p
              className={`mt-6 rounded-xl px-4 py-3 text-sm font-semibold ${
                status.type === 'success' ? 'bg-brand-50 text-brand-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {status.text}
            </p>
          )}

          {/* different keys = React never reuses one button as the other */}
          {editing && (
            <div className="mt-8 flex justify-end gap-3">
              <button key="cancel" type="button" onClick={cancelEdit} className="rounded-xl border border-navy-900/10 px-6 py-3 text-sm font-bold transition hover:border-brand-600 hover:text-brand-700">
                Cancel
              </button>
              <button key="save" type="submit" className="btn-primary rounded-xl">Save changes</button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default ProfilePage