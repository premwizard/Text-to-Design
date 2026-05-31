import React from 'react';
import { useDesignSystem } from '../context/DesignSystemContext';

const defaultFields = ['Name', 'Email', 'Message'];

export function FormContact({ title = 'Get in touch', description = 'Fill out the form below and we will contact you shortly.', fields = [], button = 'Submit' }) {
  const { handleAction } = useDesignSystem();
  const normalizedFields = Array.isArray(fields) && fields.length ? fields : defaultFields;

  return (
    <div className="rounded-[var(--radius)] p-8 shadow-2xl bg-[var(--surface)] border border-[var(--secondary)]/25 text-[var(--text)]">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="mt-3 text-[var(--text)]/85">{description}</p>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleAction({ type: 'open-modal', target: 'form-submitted' }); }} className="mt-8 grid gap-4 sm:grid-cols-2">
        {normalizedFields.map((field, index) => {
          const label = typeof field === 'object' ? field.label || field.name || 'Field' : String(field);
          const placeholder = typeof field === 'object' ? field.placeholder || field.label || field.name || '' : String(field);
          const type = typeof field === 'object' && field.type ? field.type : 'text';

          return (
            <label key={index} className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]/85">
              <span>{label}</span>
              <input
                type={type}
                placeholder={placeholder}
                className="rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--background)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
              />
            </label>
          );
        })}
        
        <div className="sm:col-span-2">
          <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-7 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 active:scale-[0.98]">
            {button}
          </button>
        </div>
      </form>
    </div>
  );
}

export function FormLogin({ title = 'Welcome back', description = 'Enter your credentials to access your account.', button = 'Sign In' }) {
  const { handleAction } = useDesignSystem();

  return (
    <div className="max-w-md mx-auto rounded-[var(--radius)] p-8 shadow-2xl bg-[var(--surface)] border border-[var(--secondary)]/25 text-[var(--text)]">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="mt-3 text-[var(--text)]/85">{description}</p>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleAction({ type: 'open-modal', target: 'login-success' }); }} className="mt-8 space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]/85">
          <span>Email Address</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--background)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]/85">
          <span>Password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--background)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        
        <button type="submit" className="w-full inline-flex items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-7 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 active:scale-[0.98]">
          {button}
        </button>
      </form>
    </div>
  );
}

export function FormSignup({ title = 'Create an account', description = 'Join us today to get started.', button = 'Sign Up' }) {
  const { handleAction } = useDesignSystem();

  return (
    <div className="max-w-md mx-auto rounded-[var(--radius)] p-8 shadow-2xl bg-[var(--surface)] border border-[var(--secondary)]/25 text-[var(--text)]">
      <div className="text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p className="mt-3 text-[var(--text)]/85">{description}</p>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleAction({ type: 'open-modal', target: 'signup-success' }); }} className="mt-8 space-y-4">
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]/85">
          <span>Full Name</span>
          <input
            type="text"
            placeholder="John Doe"
            className="rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--background)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]/85">
          <span>Email Address</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--background)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-[var(--text)]/85">
          <span>Password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="rounded-[var(--radius)] border border-[var(--secondary)]/20 bg-[var(--background)] px-4 py-3 text-[var(--text)] outline-none transition focus:border-[var(--primary)]"
          />
        </label>
        
        <button type="submit" className="w-full inline-flex items-center justify-center rounded-[var(--radius)] bg-[var(--primary)] px-7 py-3 text-sm font-semibold text-[var(--background)] transition hover:opacity-90 active:scale-[0.98]">
          {button}
        </button>
      </form>
    </div>
  );
}

export default function Form(props) {
  const { variant = 'contact' } = props;
  if (variant === 'login') return <FormLogin {...props} />;
  if (variant === 'signup') return <FormSignup {...props} />;
  return <FormContact {...props} />;
}
