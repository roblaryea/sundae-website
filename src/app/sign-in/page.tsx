'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FormField } from '@/components/auth/FormField';
import { APP_URL, SIGNIN_URL, SIGNUP_URL } from '@/lib/urls';

/* ---------------------------------------------------------------
   Feature flags — flip when backend / SSO is ready
   --------------------------------------------------------------- */
const ENABLE_SSO = false;
// TODO: When a real auth API exists, set this to the endpoint URL
// and remove the redirect-to-app fallback in handleSubmit.
const AUTH_API_URL: string | null = null;

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
});

/* ---------------------------------------------------------------
   Page
   --------------------------------------------------------------- */
export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const hasAuth = AUTH_API_URL !== null;

  /* ---- Client-side validation ---- */
  function validate(): boolean {
    const errors: typeof fieldErrors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address';
    }
    if (hasAuth) {
      if (!password) {
        errors.password = 'Password is required';
      } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  /* ---- Submit ---- */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;
    setIsLoading(true);

    try {
      if (hasAuth) {
        // Real auth endpoint — POST credentials, handle token/session
        const res = await fetch(AUTH_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, remember }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || 'Invalid email or password');
        }
        // On success: redirect to the app dashboard
        window.location.href = `${APP_URL}/dashboard`;
      } else {
        // No local auth — redirect to the external Sundae app sign-in
        const url = new URL(SIGNIN_URL);
        if (email) url.searchParams.set('email', email);
        window.location.href = url.toString();
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  /* ---- Trust points for branding panel ---- */
  const trustPoints = [
    { label: 'Real-time operations intelligence', icon: PulseIcon },
    { label: 'Multi-location benchmarking', icon: ChartIcon },
    { label: 'Competitive market signals', icon: ShieldIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ================================================================
          LEFT — Branding Panel (desktop only)
          ================================================================ */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-deep-blue via-[#0c2299] to-electric-blue">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow accent */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-electric-blue/30 rounded-full blur-[120px]" />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-12 w-full">
          {/* Logo */}
          <div>
            <Link href="/" aria-label="Sundae home">
              <Image
                src="/logos/sundae-wordmark.png"
                alt="Sundae"
                width={140}
                height={40}
                className="invert brightness-200"
                style={{ height: '36px', width: 'auto' }}
                priority
              />
            </Link>
          </div>

          {/* Headline + product shot */}
          <div className="flex-1 flex flex-col justify-center -mt-8">
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
              Decision intelligence<br />for restaurants
            </h2>
            <p className="text-blue-200/90 text-base leading-relaxed mb-8 max-w-sm">
              Performance, operations, and competitive intelligence — unified in one platform.
            </p>

            {/* Product screenshot */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
              <Image
                src="/images/product/core-overview.png"
                alt="Sundae Core dashboard"
                width={600}
                height={380}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Trust indicators */}
          <div className="space-y-3 pt-8">
            {trustPoints.map((point) => (
              <div key={point.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <point.icon />
                </div>
                <span className="text-sm text-blue-100/90">{point.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================
          RIGHT — Sign-in Form
          ================================================================ */}
      <div className="flex-1 flex flex-col min-h-screen bg-white dark:bg-gray-950">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-6 pt-6">
          <Link href="/" aria-label="Sundae home">
            <Image
              src="/logos/sundae-wordmark.png"
              alt="Sundae"
              width={120}
              height={34}
              className="dark:invert dark:hue-rotate-180"
              style={{ height: '30px', width: 'auto' }}
              priority
            />
          </Link>
        </div>

        {/* Centered form area */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="w-full max-w-[400px]">
            {/* Heading */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Sign in to Sundae
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Your unified view of performance, operations, and competitive intelligence.
              </p>
            </motion.div>

            {/* SSO buttons (feature-flagged) */}
            {ENABLE_SSO && (
              <motion.div {...fadeUp(0.05)} className="space-y-3 mb-6">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <MicrosoftIcon />
                  Continue with Microsoft
                </button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-gray-950 px-3 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      or
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Form error */}
            {formError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-sm text-red-600 dark:text-red-400"
                role="alert"
              >
                {formError}
              </motion.div>
            )}

            {/* Form */}
            <motion.form {...fadeUp(0.1)} onSubmit={handleSubmit} noValidate className="space-y-5">
              <FormField
                id="email"
                label="Email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  if (formError) setFormError('');
                }}
                error={fieldErrors.email}
                disabled={isLoading}
                autoComplete="email"
                required
              />

              {/* Password + Remember/Forgot — only when auth backend exists */}
              {hasAuth && (
                <>
                  <div>
                    <FormField
                      id="password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                        if (formError) setFormError('');
                      }}
                      error={fieldErrors.password}
                      disabled={isLoading}
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-electric-blue focus:ring-electric-blue/30 bg-white dark:bg-gray-900/50"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                    </label>
                    <a
                      href={`${APP_URL}/forgot-password`}
                      className="text-sm font-medium text-electric-blue hover:text-deep-blue dark:hover:text-blue-400 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                </>
              )}

              {/* Helper text — redirect mode */}
              {!hasAuth && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {"You\u2019ll sign in securely in the Sundae app."}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-deep-blue to-electric-blue shadow-lg shadow-electric-blue/25 hover:shadow-xl hover:shadow-electric-blue/35 hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-electric-blue disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    {hasAuth ? 'Signing in...' : 'Redirecting...'}
                  </>
                ) : (
                  hasAuth ? 'Sign in' : 'Continue to Sundae App'
                )}
              </button>
            </motion.form>

            {/* Sign up link */}
            <motion.p {...fadeUp(0.15)} className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              {"Don't have an account? "}
              <a
                href={SIGNUP_URL}
                className="font-medium text-electric-blue hover:text-deep-blue dark:hover:text-blue-400 transition-colors"
              >
                Get started free
              </a>
            </motion.p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 lg:pb-8">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400 dark:text-gray-500">
            <Link href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link href="/security" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Security
            </Link>
            <Link href="/contact" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Inline SVG Icons (small, not worth a separate file)
   --------------------------------------------------------------- */

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <rect x="1" y="1" width="10" height="10" fill="#F25022" />
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
      <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}
