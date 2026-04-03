'use client';

import React, { useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { COUNTRY_CODES } from '@/lib/countryCodes';

interface LeadCaptureFormProps {
  ctaLabel: string;
  defaultMessage?: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  countryCode: string;
  phone: string;
  numberOfLocations: string;
  primaryPOS: string;
  message: string;
}

type FormErrors = Record<string, string>;

const formCopy = {
  en: {
    required: {
      name: 'Full name is required',
      email: 'Work email is required',
      company: 'Company or group name is required',
      role: 'Role or title is required',
      country: 'Country is required',
      countryCode: 'Country code is required',
      phone: 'Phone number is required',
      numberOfLocations: 'Number of locations is required',
      primaryPOS: 'Primary POS/system is required',
      message: 'Please provide some context about your needs',
    },
    validEmail: 'Please enter a valid email address',
    validPhone: 'Please enter a valid phone number (7-15 digits), e.g., 501234567',
    genericError: 'Failed to submit. Please try again.',
    successTitle: 'Thank you!',
    successBody: "We've received your request and will get back to you shortly.",
    successNote: 'Check your email for confirmation.',
    websiteLabel: 'Website',
    labels: {
      name: 'Full Name',
      email: 'Work Email',
      company: 'Company or Group Name',
      role: 'Role / Title',
      country: 'Country',
      phone: 'Phone Number',
      numberOfLocations: 'Number of Locations',
      primaryPOS: 'Primary POS/System Used',
      message: 'Tell us about your needs',
    },
    placeholders: {
      name: 'John Doe',
      email: 'john@company.com',
      company: 'Your Company',
      role: 'CEO, Operations Manager, etc.',
      country: 'Select your country',
      phone: '555 123 4567',
      numberOfLocations: 'Select number of locations',
      primaryPOS: 'e.g., Toast, Square, Oracle Simphony',
      message: 'Tell us about your challenges, goals, or specific interests...',
    },
    locationOptions: ['1 location', '2-5 locations', '6-10 locations', '11-25 locations', '26-50 locations', '51-100 locations', '101-200 locations', '200+ locations'],
    submitting: 'Submitting...',
    privacyPrefix: 'By submitting this form, you agree to our',
    privacyLink: 'privacy policy',
    privacySuffix: "We'll never share your information.",
  },
  ar: {
    required: {
      name: 'الاسم الكامل مطلوب',
      email: 'البريد الإلكتروني المهني مطلوب',
      company: 'اسم الشركة أو المجموعة مطلوب',
      role: 'المسمى الوظيفي أو الدور مطلوب',
      country: 'الدولة مطلوبة',
      countryCode: 'رمز الدولة مطلوب',
      phone: 'رقم الهاتف مطلوب',
      numberOfLocations: 'عدد المواقع مطلوب',
      primaryPOS: 'نظام نقاط البيع الأساسي مطلوب',
      message: 'يرجى تزويدنا بسياق حول احتياجاتك',
    },
    validEmail: 'يرجى إدخال بريد إلكتروني صالح',
    validPhone: 'يرجى إدخال رقم هاتف صالح (7-15 رقماً)، مثل 501234567',
    genericError: 'تعذر الإرسال. حاول مرة أخرى.',
    successTitle: 'شكراً لك',
    successBody: 'تلقينا طلبك وسنعود إليك قريباً.',
    successNote: 'تحقق من بريدك الإلكتروني للحصول على التأكيد.',
    websiteLabel: 'الموقع الإلكتروني',
    labels: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني المهني',
      company: 'اسم الشركة أو المجموعة',
      role: 'الدور / المسمى الوظيفي',
      country: 'الدولة',
      phone: 'رقم الهاتف',
      numberOfLocations: 'عدد المواقع',
      primaryPOS: 'نظام نقاط البيع الأساسي المستخدم',
      message: 'أخبرنا باحتياجاتك',
    },
    placeholders: {
      name: 'أحمد علي',
      email: 'name@company.com',
      company: 'اسم شركتك',
      role: 'مدير عمليات، رئيس تنفيذي، إلخ',
      country: 'اختر دولتك',
      phone: '555 123 4567',
      numberOfLocations: 'اختر عدد المواقع',
      primaryPOS: 'مثال: Toast أو Square أو Oracle Simphony',
      message: 'أخبرنا عن تحدياتك أو أهدافك أو ما يهمك بالتحديد...',
    },
    locationOptions: ['موقع واحد', '2-5 مواقع', '6-10 مواقع', '11-25 موقعاً', '26-50 موقعاً', '51-100 موقع', '101-200 موقع', 'أكثر من 200 موقع'],
    submitting: 'جارٍ الإرسال...',
    privacyPrefix: 'بإرسال هذا النموذج، فإنك توافق على',
    privacyLink: 'سياسة الخصوصية',
    privacySuffix: 'لن نشارك معلوماتك أبداً.',
  },
  fr: {
    required: {
      name: 'Le nom complet est requis',
      email: "L'adresse e-mail professionnelle est requise",
      company: "Le nom de l'entreprise ou du groupe est requis",
      role: 'Le rôle ou le titre est requis',
      country: 'Le pays est requis',
      countryCode: 'Le code pays est requis',
      phone: 'Le numéro de téléphone est requis',
      numberOfLocations: 'Le nombre de sites est requis',
      primaryPOS: 'Le POS/système principal est requis',
      message: 'Veuillez partager un peu de contexte sur vos besoins',
    },
    validEmail: 'Veuillez saisir une adresse e-mail valide',
    validPhone: 'Veuillez saisir un numéro valide (7 à 15 chiffres), ex. 501234567',
    genericError: "Échec de l'envoi. Veuillez réessayer.",
    successTitle: 'Merci',
    successBody: 'Nous avons bien reçu votre demande et reviendrons vers vous rapidement.',
    successNote: 'Vérifiez votre e-mail pour la confirmation.',
    websiteLabel: 'Site web',
    labels: {
      name: 'Nom complet',
      email: 'E-mail professionnel',
      company: "Nom de l'entreprise ou du groupe",
      role: 'Rôle / Titre',
      country: 'Pays',
      phone: 'Numéro de téléphone',
      numberOfLocations: 'Nombre de sites',
      primaryPOS: 'POS/système principal utilisé',
      message: 'Parlez-nous de vos besoins',
    },
    placeholders: {
      name: 'Jean Dupont',
      email: 'nom@entreprise.com',
      company: 'Votre entreprise',
      role: 'PDG, responsable opérations, etc.',
      country: 'Sélectionnez votre pays',
      phone: '555 123 4567',
      numberOfLocations: 'Sélectionnez le nombre de sites',
      primaryPOS: 'ex. Toast, Square, Oracle Simphony',
      message: 'Parlez-nous de vos défis, objectifs ou intérêts spécifiques...',
    },
    locationOptions: ['1 site', '2-5 sites', '6-10 sites', '11-25 sites', '26-50 sites', '51-100 sites', '101-200 sites', '200+ sites'],
    submitting: 'Envoi en cours...',
    privacyPrefix: 'En envoyant ce formulaire, vous acceptez notre',
    privacyLink: 'politique de confidentialité',
    privacySuffix: 'Nous ne partagerons jamais vos informations.',
  },
  es: {
    required: {
      name: 'El nombre completo es obligatorio',
      email: 'El correo profesional es obligatorio',
      company: 'El nombre de la empresa o grupo es obligatorio',
      role: 'El cargo o puesto es obligatorio',
      country: 'El país es obligatorio',
      countryCode: 'El código del país es obligatorio',
      phone: 'El número de teléfono es obligatorio',
      numberOfLocations: 'El número de ubicaciones es obligatorio',
      primaryPOS: 'El POS/sistema principal es obligatorio',
      message: 'Cuéntanos un poco sobre tus necesidades',
    },
    validEmail: 'Introduce una dirección de correo válida',
    validPhone: 'Introduce un número válido (7-15 dígitos), p. ej., 501234567',
    genericError: 'No se pudo enviar. Inténtalo de nuevo.',
    successTitle: 'Gracias',
    successBody: 'Hemos recibido tu solicitud y te responderemos en breve.',
    successNote: 'Revisa tu correo para ver la confirmación.',
    websiteLabel: 'Sitio web',
    labels: {
      name: 'Nombre completo',
      email: 'Correo profesional',
      company: 'Nombre de la empresa o grupo',
      role: 'Cargo / Puesto',
      country: 'País',
      phone: 'Número de teléfono',
      numberOfLocations: 'Número de ubicaciones',
      primaryPOS: 'POS/sistema principal utilizado',
      message: 'Cuéntanos sobre tus necesidades',
    },
    placeholders: {
      name: 'Juan Pérez',
      email: 'nombre@empresa.com',
      company: 'Tu empresa',
      role: 'CEO, gerente de operaciones, etc.',
      country: 'Selecciona tu país',
      phone: '555 123 4567',
      numberOfLocations: 'Selecciona el número de ubicaciones',
      primaryPOS: 'p. ej., Toast, Square, Oracle Simphony',
      message: 'Cuéntanos sobre tus retos, objetivos o intereses concretos...',
    },
    locationOptions: ['1 ubicación', '2-5 ubicaciones', '6-10 ubicaciones', '11-25 ubicaciones', '26-50 ubicaciones', '51-100 ubicaciones', '101-200 ubicaciones', '200+ ubicaciones'],
    submitting: 'Enviando...',
    privacyPrefix: 'Al enviar este formulario, aceptas nuestra',
    privacyLink: 'política de privacidad',
    privacySuffix: 'Nunca compartiremos tu información.',
  },
} as const;

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  ctaLabel,
  defaultMessage = '',
  className = '',
}) => {
  const { locale } = useWebsiteI18n();
  const copy = formCopy[locale] ?? formCopy.en;
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    country: '',
    countryCode: '+971',
    phone: '',
    numberOfLocations: '',
    primaryPOS: '',
    message: defaultMessage,
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  const fieldRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const countryToDialCode = COUNTRY_CODES.reduce((acc, country) => {
    acc[country.name] = country.code;
    return acc;
  }, {} as Record<string, string>);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    const dialCode = countryToDialCode[newCountry];
    setFormData((prev) => ({
      ...prev,
      country: newCountry,
      countryCode: dialCode || prev.countryCode,
    }));
    if (errors.country) {
      setErrors((prev) => ({ ...prev, country: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const normalizePhoneForStorage = (raw: string) => {
    if (!raw) return '';
    let value = raw.replace(/[()[\]\-\s]/g, '');
    if (value.startsWith('00')) value = `+${value.slice(2)}`;
    if (!value.startsWith('+')) value = `+${value.replace(/^\+/g, '')}`;
    value = value.replace(/\+{2,}/g, '+');
    value = value.replace(/[^+\d]/g, '');
    return value;
  };

  const validatePhone = (phone: string) => /^\+\d{7,15}$/.test(normalizePhoneForStorage(phone));

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) nextErrors.name = copy.required.name;
    if (!formData.email.trim()) nextErrors.email = copy.required.email;
    else if (!validateEmail(formData.email)) nextErrors.email = copy.validEmail;
    if (!formData.company.trim()) nextErrors.company = copy.required.company;
    if (!formData.role.trim()) nextErrors.role = copy.required.role;
    if (!formData.country.trim()) nextErrors.country = copy.required.country;
    if (!formData.countryCode) nextErrors.countryCode = copy.required.countryCode;
    if (!formData.phone.trim()) nextErrors.phone = copy.required.phone;
    else {
      const fullPhone = formData.phone.startsWith('+')
        ? formData.phone
        : `${formData.countryCode || ''}${formData.phone}`;
      if (!validatePhone(fullPhone)) nextErrors.phone = copy.validPhone;
    }
    if (!formData.numberOfLocations.trim()) nextErrors.numberOfLocations = copy.required.numberOfLocations;
    if (!formData.primaryPOS.trim()) nextErrors.primaryPOS = copy.required.primaryPOS;
    if (!formData.message.trim()) nextErrors.message = copy.required.message;
    setErrors(nextErrors);
    return nextErrors;
  };

  const scrollToFirstError = (errorFields?: Record<string, string>) => {
    const firstField = Object.keys(errorFields || errors)[0];
    if (!firstField) return;
    fieldRefs.current[firstField]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const input = fieldRefs.current[firstField]?.querySelector('input, textarea, select') as HTMLElement | null;
    input?.focus();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');
    if (honeypot) {
      setIsSuccess(true);
      return;
    }
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => scrollToFirstError(validationErrors), 100);
      return;
    }
    setIsSubmitting(true);
    try {
      const sourcePage = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const localPhone = formData.phone.trim();
      const fullPhone = localPhone.startsWith('+')
        ? localPhone
        : `${formData.countryCode || ''}${localPhone}`;
      const response = await fetch('/api/cta/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: normalizePhoneForStorage(fullPhone),
          ctaLabel,
          sourcePage,
          utmSource: searchParams.get('utm_source') || undefined,
          utmMedium: searchParams.get('utm_medium') || undefined,
          utmCampaign: searchParams.get('utm_campaign') || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || copy.genericError);
      }
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        country: '',
        countryCode: '+971',
        phone: '',
        numberOfLocations: '',
        primaryPOS: '',
        message: defaultMessage,
      });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : copy.genericError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`max-w-2xl mx-auto ${className}`}>
        <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <svg className="h-8 w-8 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-[var(--text-primary)]">{copy.successTitle}</h3>
          <p className="mb-2 text-lg text-[var(--text-secondary)]">{copy.successBody}</p>
          <p className="text-sm text-[var(--text-supporting)]">{copy.successNote}</p>
        </div>
      </div>
    );
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border-2 px-4 py-3 outline-none transition-all duration-200 focus:ring-2 ${
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
        : 'border-white/[0.1] bg-[var(--surface-subtle)] text-[var(--text-primary)] focus:border-blue-600 focus:ring-blue-600/20'
    }`;

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
          <label htmlFor="website_url">{copy.websiteLabel}</label>
          <input id="website_url" name="website_url" type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </div>

        {[
          ['name', copy.labels.name, copy.placeholders.name, 'text'],
          ['email', copy.labels.email, copy.placeholders.email, 'email'],
          ['company', copy.labels.company, copy.placeholders.company, 'text'],
          ['role', copy.labels.role, copy.placeholders.role, 'text'],
        ].map(([name, label, placeholder, type]) => (
          <div key={name} ref={(el) => { fieldRefs.current[name] = el; }}>
            <label htmlFor={name} className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name as keyof FormData] as string}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className={inputClass(!!errors[name])}
              placeholder={placeholder}
            />
            {errors[name] && <p id={`${name}-error`} className="mt-1 text-sm text-red-600">{errors[name]}</p>}
          </div>
        ))}

        <div ref={(el) => { fieldRefs.current.country = el; }}>
          <label htmlFor="country" className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            {copy.labels.country} <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? 'country-error' : undefined}
            className={inputClass(!!errors.country)}
          >
            <option value="">{copy.placeholders.country}</option>
            {COUNTRY_CODES.map((country) => (
              <option key={country.iso} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <p id="country-error" className="mt-1 text-sm text-red-600">{errors.country}</p>}
        </div>

        <div ref={(el) => { fieldRefs.current.phone = el; }}>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            {copy.labels.phone} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.countryCode || !!errors.phone}
                aria-describedby={errors.countryCode || errors.phone ? 'phone-error' : undefined}
                className={inputClass(!!errors.countryCode || !!errors.phone)}
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.iso} value={country.code}>
                    {country.code} {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={inputClass(!!errors.phone)}
                placeholder={copy.placeholders.phone}
              />
            </div>
          </div>
          {(errors.countryCode || errors.phone) && (
            <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone || errors.countryCode}</p>
          )}
        </div>

        <div ref={(el) => { fieldRefs.current.numberOfLocations = el; }}>
          <label htmlFor="numberOfLocations" className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            {copy.labels.numberOfLocations} <span className="text-red-500">*</span>
          </label>
          <select
            id="numberOfLocations"
            name="numberOfLocations"
            value={formData.numberOfLocations}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.numberOfLocations}
            aria-describedby={errors.numberOfLocations ? 'locations-error' : undefined}
            className={inputClass(!!errors.numberOfLocations)}
          >
            <option value="">{copy.placeholders.numberOfLocations}</option>
            <option value="1">{copy.locationOptions[0]}</option>
            <option value="2-5">{copy.locationOptions[1]}</option>
            <option value="6-10">{copy.locationOptions[2]}</option>
            <option value="11-25">{copy.locationOptions[3]}</option>
            <option value="26-50">{copy.locationOptions[4]}</option>
            <option value="51-100">{copy.locationOptions[5]}</option>
            <option value="101-200">{copy.locationOptions[6]}</option>
            <option value="200+">{copy.locationOptions[7]}</option>
          </select>
          {errors.numberOfLocations && <p id="locations-error" className="mt-1 text-sm text-red-600">{errors.numberOfLocations}</p>}
        </div>

        <div ref={(el) => { fieldRefs.current.primaryPOS = el; }}>
          <label htmlFor="primaryPOS" className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            {copy.labels.primaryPOS} <span className="text-red-500">*</span>
          </label>
          <input
            id="primaryPOS"
            name="primaryPOS"
            type="text"
            value={formData.primaryPOS}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.primaryPOS}
            aria-describedby={errors.primaryPOS ? 'pos-error' : undefined}
            className={inputClass(!!errors.primaryPOS)}
            placeholder={copy.placeholders.primaryPOS}
          />
          {errors.primaryPOS && <p id="pos-error" className="mt-1 text-sm text-red-600">{errors.primaryPOS}</p>}
        </div>

        <div ref={(el) => { fieldRefs.current.message = el; }}>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
            {copy.labels.message} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputClass(!!errors.message)} resize-none`}
            placeholder={copy.placeholders.message}
          />
          {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        {apiError && (
          <div role="alert" aria-live="assertive" className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{apiError}</p>
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? copy.submitting : ctaLabel}
        </Button>

        <p className="text-center text-xs text-[var(--text-muted)]">
          {copy.privacyPrefix}{' '}
          <Link href="/privacy" className="underline transition-colors hover:text-[var(--text-secondary)]">
            {copy.privacyLink}
          </Link>
          . {copy.privacySuffix}
        </p>
      </form>
    </div>
  );
};
