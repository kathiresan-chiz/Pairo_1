import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes } from 'react'
import { CheckCircle2, ChevronDown } from 'lucide-react'
import Button from './Button'
import { liquidColor, useLiquidPill } from './LiquidPill'
import { errorMessage, submitEnquiry, type Intent } from '../lib/api'
import { industries } from '../content/site'

type FormValues = typeof initial
type FormErrors = Partial<Record<keyof FormValues, string>>
type Status = 'idle' | 'sending' | 'sent'

const initial = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  industry: '',
  requirements: '',
  preferredContact: 'Email',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.fullName.trim()) errors.fullName = 'Please enter your name.'
  if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid business email.'
  if (!values.company.trim()) errors.company = 'Please enter your company name.'
  return errors
}

export default function ContactForm({ intent = 'general' }: { intent?: Intent }) {
  const [values, setValues] = useState<FormValues>(initial)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    setServerError('')
    try {
      await submitEnquiry({ ...values, intent })
      setStatus('sent')
    } catch (err) {
      setServerError(errorMessage(err))
      setStatus('idle')
    }
  }

  if (status === 'sent') {
    return (
      <div className="grid min-h-[420px] place-items-center rounded-[2rem] bg-white p-8 text-center ring-1 ring-line">
        <div>
          <CheckCircle2 className="mx-auto size-12 text-brand" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-semibold">Thank you, {values.fullName.split(' ')[0]}.</h2>
          <p className="mx-auto mt-3 max-w-sm text-muted">
            Your message has reached our team. We will be in touch by {values.preferredContact.toLowerCase()} shortly.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[2rem] bg-white p-6 ring-1 ring-line sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="fullName" value={values.fullName} onChange={update} error={errors.fullName} autoComplete="name" required />
        <Field label="Business email" name="email" type="email" value={values.email} onChange={update} error={errors.email} autoComplete="email" required />
        <Field label="Company name" name="company" value={values.company} onChange={update} error={errors.company} autoComplete="organization" required />
        <Field label="Phone number" name="phone" type="tel" value={values.phone} onChange={update} autoComplete="tel" />

        <div className="sm:col-span-2">
          <label htmlFor="industry" className="text-sm font-semibold">
            Industry
          </label>
          <div className="relative mt-2">
            <select
              id="industry"
              name="industry"
              value={values.industry}
              onChange={update}
              className={`w-full cursor-pointer appearance-none rounded-2xl bg-mist py-3.5 pr-12 pl-4 ring-1 ring-transparent outline-none focus:ring-brand ${
                values.industry ? 'text-ink' : 'text-muted/80'
              }`}
            >
              <option value="">Select your industry</option>
              {industries.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="requirements" className="text-sm font-semibold">
            What would you like to improve?
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={5}
            value={values.requirements}
            onChange={update}
            placeholder="Tell us about your business, the systems you use today and what you need."
            className="mt-2 w-full resize-none rounded-2xl bg-mist px-4 py-3.5 ring-1 ring-transparent outline-none placeholder:text-muted/70 focus:ring-brand"
          />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-semibold">Preferred contact method</legend>
          <MethodPicker value={values.preferredContact} onChange={update} />
        </fieldset>
      </div>

      {serverError && (
        <p role="alert" className="mt-6 rounded-2xl bg-crimson/10 px-4 py-3 text-sm text-[#b02c48]">
          {serverError}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">We use your details only to respond to this enquiry.</p>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : intent === 'demo' ? 'Request my demo' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}

const CONTACT_METHODS = ['Email', 'Phone', 'Video call']

interface MethodPickerProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

// Preferred contact method as a liquid segmented control over native radios.
function MethodPicker({ value, onChange }: MethodPickerProps) {
  const activeIndex = CONTACT_METHODS.indexOf(value)
  const { itemRef, layer } = useLiquidPill(activeIndex)

  return (
    <div className="relative mt-3 inline-flex gap-1 rounded-full bg-mist p-1">
      {layer}
      {CONTACT_METHODS.map((option, i) => (
        <label
          key={option}
          ref={itemRef(i)}
          className={`relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
            i === activeIndex ? `${liquidColor(i).text} delay-300` : 'text-muted hover:text-ink'
          }`}
        >
          <input
            type="radio"
            name="preferredContact"
            value={option}
            checked={value === option}
            onChange={onChange}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  )
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
}

function Field({ label, name, error, required, ...props }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
        {required && <span className="text-crimson"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 w-full rounded-2xl bg-mist px-4 py-3.5 ring-1 outline-none focus:ring-brand ${
          error ? 'ring-crimson' : 'ring-transparent'
        }`}
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-[#b02c48]">
          {error}
        </p>
      )}
    </div>
  )
}
