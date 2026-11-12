import {useState, type FormEvent} from 'react';
import {person} from '../content';
import {Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink} from 'lucide-react';

function LinkedInIcon({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type FormState = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    if (!form.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!form.subject.trim()) {
      errs.subject = 'Subject is required';
    }

    if (!form.message.trim()) {
      errs.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="relative isolate px-4 py-24 sm:px-6 lg:px-8 bg-page text-cocoa-main">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-oat-card px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cherry-main mb-3">
            <span className="flex size-5 items-center justify-center rounded-full bg-cherry-main text-[11px] font-bold text-oat-base">
              04
            </span>
            <span>Section 4 · Direct Inquiries</span>
          </div>
          <h2 className="font-presilla text-3xl sm:text-5xl font-bold tracking-tight text-ink">
            Get in Touch With Bilal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-mute leading-relaxed font-sans">
            Have an internship opportunity, freelance project, or system design inquiry? Send a message below or connect directly through official channels.
          </p>
        </div>

        {/* 2-Column Layout: Contact Form + Direct Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Container (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-line bg-oat-card/70 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-cherry-main/15 text-cherry-main">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="font-presilla text-2xl font-bold text-ink">
                  Inquiry Received!
                </h3>
                <p className="text-sm text-mute max-w-md leading-relaxed">
                  Thank you, <strong className="text-ink">{form.fullName}</strong>. Your message titled "{form.subject}" has been successfully recorded in this local preview session.
                </p>
                <div className="rounded-xl border border-cherry-main/30 bg-cherry-main/10 p-4 text-xs text-mute max-w-md text-left">
                  <p className="font-semibold text-cherry-main mb-1 flex items-center gap-1.5">
                    <AlertCircle className="size-4" /> Notice Regarding Live Email Delivery:
                  </p>
                  <p>
                    This portfolio runs client-side without an external mail server connected. For direct communication, please send your email directly to <strong className="text-ink">{person.email}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({fullName: '', email: '', subject: '', message: ''});
                  }}
                  className="mt-4 rounded-full border border-cherry-main bg-cherry-main px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-oat-base transition-transform hover:bg-cherry-vibrant active:scale-95"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-mute mb-2">
                      Full Name <span className="text-cherry-main">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({...form, fullName: e.target.value})}
                      placeholder="e.g. Alexander Vance"
                      className={`w-full rounded-xl border bg-field px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute/60 focus:ring-2 focus:ring-cherry-main/40 ${
                        errors.fullName ? 'border-red-500' : 'border-line hover:border-cocoa-muted focus:border-cherry-main'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-mute mb-2">
                      Email Address <span className="text-cherry-main">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="e.g. alexander@example.com"
                      className={`w-full rounded-xl border bg-field px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute/60 focus:ring-2 focus:ring-cherry-main/40 ${
                        errors.email ? 'border-red-500' : 'border-line hover:border-cocoa-muted focus:border-cherry-main'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-mute mb-2">
                    Subject <span className="text-cherry-main">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    placeholder="e.g. Full Stack Internship Opportunity"
                    className={`w-full rounded-xl border bg-field px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute/60 focus:ring-2 focus:ring-cherry-main/40 ${
                      errors.subject ? 'border-red-500' : 'border-line hover:border-cocoa-muted focus:border-cherry-main'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-mute mb-2">
                    Message <span className="text-cherry-main">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className={`w-full resize-y rounded-xl border bg-field px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-mute/60 focus:ring-2 focus:ring-cherry-main/40 ${
                      errors.message ? 'border-red-500' : 'border-line hover:border-cocoa-muted focus:border-cherry-main'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-cherry-main py-3.5 px-6 font-digitalt text-xs font-bold uppercase tracking-widest text-oat-base shadow-sm transition-all hover:bg-cherry-vibrant hover:shadow-md active:scale-[0.99] disabled:opacity-70"
                >
                  {submitting ? (
                    <span>Validating & Recording...</span>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Social Links (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <a
              href={`mailto:${person.email}`}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-oat-card/70 p-5 transition-all hover:border-cherry-main/50 hover:bg-oat-card hover:shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-cherry-main text-oat-base shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="size-5" />
              </div>
              <div className="flex-1">
                <span className="text-micro uppercase font-bold text-mute tracking-wider">Email Address</span>
                <p className="font-semibold text-ink group-hover:text-cherry-main transition-colors">
                  {person.email}
                </p>
                <span className="text-xs text-mute">Direct responses within 24 hours</span>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:03176801802"
              className="group flex items-start gap-4 rounded-2xl border border-line bg-oat-card/70 p-5 transition-all hover:border-cherry-main/50 hover:bg-oat-card hover:shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-cocoa-main text-oat-base shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="size-5" />
              </div>
              <div className="flex-1">
                <span className="text-micro uppercase font-bold text-mute tracking-wider">Phone / WhatsApp</span>
                <p className="font-semibold text-ink group-hover:text-cherry-main transition-colors">
                  {person.phone}
                </p>
                <span className="text-xs text-mute">Available Mon - Sat</span>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-oat-card/70 p-5">
              <div className="flex size-11 items-center justify-center rounded-xl bg-cocoa-muted text-oat-base shrink-0">
                <MapPin className="size-5" />
              </div>
              <div>
                <span className="text-micro uppercase font-bold text-mute tracking-wider">Location</span>
                <p className="font-semibold text-ink">{person.location}</p>
                <span className="text-xs text-mute">Qarshi University Campus</span>
              </div>
            </div>

            {/* LinkedIn & Store Links */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-line bg-oat-card/70 p-3.5 text-xs font-bold text-ink transition-all hover:border-cherry-main hover:text-cherry-main"
              >
                <span className="flex items-center gap-2">
                  <LinkedInIcon className="size-4 text-cherry-main" />
                  <span>LinkedIn</span>
                </span>
                <ExternalLink className="size-3 text-mute" />
              </a>

              <a
                href={person.liveProject}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-line bg-oat-card/70 p-3.5 text-xs font-bold text-ink transition-all hover:border-cherry-main hover:text-cherry-main"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="size-4 text-cherry-main" />
                  <span>Live Store</span>
                </span>
                <ExternalLink className="size-3 text-mute" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
