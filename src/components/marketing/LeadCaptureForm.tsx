'use client';

import React, { useState, FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/Button';
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

interface FormErrors {
  [key: string]: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  ctaLabel,
  defaultMessage = '',
  className = '',
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    country: '',
    countryCode: '+971', // Default to UAE
    phone: '', // This will be local number only, no dial code
    numberOfLocations: '',
    primaryPOS: '',
    message: defaultMessage,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Refs for scrolling to first error
  const fieldRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Create a map from country name to dial code
  const countryToDialCode = COUNTRY_CODES.reduce((acc, country) => {
    acc[country.name] = country.code;
    return acc;
  }, {} as Record<string, string>);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Clear API error
    if (apiError) setApiError('');
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    const dialCode = countryToDialCode[newCountry];

    setFormData(prev => ({
      ...prev,
      country: newCountry,
      countryCode: dialCode || prev.countryCode,
      // IMPORTANT: Do NOT modify the phone field here
      // Phone field contains local number only, country code is separate
    }));

    // Clear error for country field
    if (errors.country) {
      setErrors({
        ...errors,
        country: '',
      });
    }

    // Clear API error
    if (apiError) setApiError('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const normalizePhoneForStorage = (raw: string): string => {
    if (!raw) return '';

    // Remove spaces, dashes, parentheses, brackets
    let value = raw.replace(/[()[\]\-\s]/g, '');

    // If it starts with 00, convert to +
    if (value.startsWith('00')) {
      value = '+' + value.slice(2);
    }

    // Ensure exactly one leading +
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/^\+/g, '');
    }

    // Remove any duplicate + signs
    value = value.replace(/\+{2,}/g, '+');

    // Keep only + and digits
    value = value.replace(/[^+\d]/g, '');

    return value;
  };

  const validatePhone = (phone: string): boolean => {
    const normalized = normalizePhoneForStorage(phone);
    // E.164-ish: + followed by 7-15 digits
    const phoneRegex = /^\+\d{7,15}$/;
    return phoneRegex.test(normalized);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = 'Company or group name is required';
    }

    // Role validation
    if (!formData.role.trim()) {
      newErrors.role = 'Role or title is required';
    }

    // Country validation
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    // Country code validation
    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    }

    // Phone validation - combine dial code with local number
    const localPhone = formData.phone.trim();
    if (!localPhone) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Build full phone by combining dial code + local number
      let fullPhone: string;
      if (localPhone.startsWith('+')) {
        // User typed international format
        fullPhone = localPhone;
      } else if (formData.countryCode) {
        fullPhone = `${formData.countryCode}${localPhone}`;
      } else {
        fullPhone = localPhone;
      }
      
      const normalized = normalizePhoneForStorage(fullPhone);
      if (!validatePhone(normalized)) {
        newErrors.phone = 'Please enter a valid phone number (7-15 digits), e.g., 501234567';
      }
    }

    // Number of locations validation
    if (!formData.numberOfLocations.trim()) {
      newErrors.numberOfLocations = 'Number of locations is required';
    }

    // Primary POS validation
    if (!formData.primaryPOS.trim()) {
      newErrors.primaryPOS = 'Primary POS/system is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide some context about your needs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField && fieldRefs.current[firstErrorField]) {
      fieldRefs.current[firstErrorField]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      
      // Focus the input
      const input = fieldRefs.current[firstErrorField]?.querySelector('input, textarea, select') as HTMLElement;
      input?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    // Validate form
    if (!validateForm()) {
      setTimeout(scrollToFirstError, 100);
      return;
    }

    setIsSubmitting(true);

    try {
      // Get source page
      const sourcePage = window.location.pathname;

      // Parse UTM parameters
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get('utm_source') || undefined;
      const utmMedium = searchParams.get('utm_medium') || undefined;
      const utmCampaign = searchParams.get('utm_campaign') || undefined;

      // Combine dial code with local phone number for API submission
      const localPhone = formData.phone.trim();
      let fullPhone: string;
      
      if (localPhone.startsWith('+')) {
        // User typed full international number
        fullPhone = localPhone;
      } else if (formData.countryCode) {
        // Combine country code with local number
        fullPhone = `${formData.countryCode}${localPhone}`;
      } else {
        fullPhone = localPhone;
      }
      
      const normalizedPhone = normalizePhoneForStorage(fullPhone);

      // Submit to API
      const response = await fetch('/api/cta/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          country: formData.country,
          phone: normalizedPhone,
          numberOfLocations: formData.numberOfLocations,
          primaryPOS: formData.primaryPOS,
          message: formData.message,
          ctaLabel,
          sourcePage,
          utmSource,
          utmMedium,
          utmCampaign,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success - reset form
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
      setApiError(
        err instanceof Error ? err.message : 'Failed to submit. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className={`max-w-2xl mx-auto ${className}`}>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 text-center border-2 border-green-200 dark:border-green-800 shadow-lg">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Thank You!
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            We've received your request and will get back to you shortly.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Check your email for confirmation.
          </p>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name - Required */}
        <div ref={(el) => { fieldRefs.current.name = el; }}>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email - Required */}
        <div ref={(el) => { fieldRefs.current.email = el; }}>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        {/* Company - Required */}
        <div ref={(el) => { fieldRefs.current.company = el; }}>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Company or Group Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.company
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
            placeholder="Your Company"
          />
          {errors.company && (
            <p id="company-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.company}
            </p>
          )}
        </div>

        {/* Role - Required */}
        <div ref={(el) => { fieldRefs.current.role = el; }}>
          <label
            htmlFor="role"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Role / Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? 'role-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.role
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
            placeholder="CEO, Operations Manager, etc."
          />
          {errors.role && (
            <p id="role-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.role}
            </p>
          )}
        </div>

        {/* Country - Required */}
        <div ref={(el) => { fieldRefs.current.country = el; }}>
          <label
            htmlFor="country"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            aria-required="true"
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? 'country-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.country
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
          >
            <option value="">Select your country</option>
            {COUNTRY_CODES.map((country) => (
              <option key={country.iso} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p id="country-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.country}
            </p>
          )}
        </div>

        {/* Phone with Country Code - Required */}
        <div ref={(el) => { fieldRefs.current.phone = el; }}>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {/* Country Code Selector */}
            <div className="col-span-1">
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.countryCode}
                aria-describedby={errors.countryCode || errors.phone ? 'phone-error' : undefined}
                className={`w-full px-3 py-3 rounded-lg border-2 ${
                  errors.countryCode || errors.phone
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none text-sm`}
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.iso} value={country.code}>
                    {country.code} {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Phone Number Input */}
            <div className="col-span-2">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
                placeholder="555 123 4567"
              />
            </div>
          </div>
          {(errors.countryCode || errors.phone) && (
            <p id="phone-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.phone || errors.countryCode}
            </p>
          )}
        </div>

        {/* Number of Locations - Required */}
        <div ref={(el) => { fieldRefs.current.numberOfLocations = el; }}>
          <label
            htmlFor="numberOfLocations"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Number of Locations <span className="text-red-500">*</span>
          </label>
          <select
            id="numberOfLocations"
            name="numberOfLocations"
            value={formData.numberOfLocations}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.numberOfLocations}
            aria-describedby={errors.numberOfLocations ? 'locations-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.numberOfLocations
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
          >
            <option value="">Select number of locations</option>
            <option value="1">1 location</option>
            <option value="2-5">2-5 locations</option>
            <option value="6-10">6-10 locations</option>
            <option value="11-25">11-25 locations</option>
            <option value="26-50">26-50 locations</option>
            <option value="51-100">51-100 locations</option>
            <option value="101-200">101-200 locations</option>
            <option value="200+">200+ locations</option>
          </select>
          {errors.numberOfLocations && (
            <p id="locations-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.numberOfLocations}
            </p>
          )}
        </div>

        {/* Primary POS/System - Required */}
        <div ref={(el) => { fieldRefs.current.primaryPOS = el; }}>
          <label
            htmlFor="primaryPOS"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Primary POS/System Used <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="primaryPOS"
            name="primaryPOS"
            value={formData.primaryPOS}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.primaryPOS}
            aria-describedby={errors.primaryPOS ? 'pos-error' : undefined}
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.primaryPOS
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none`}
            placeholder="e.g., Toast, Square, Oracle Simphony"
          />
          {errors.primaryPOS && (
            <p id="pos-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.primaryPOS}
            </p>
          )}
        </div>

        {/* Message - Required */}
        <div ref={(el) => { fieldRefs.current.message = el; }}>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Tell us about your needs <span className="text-red-500">*</span>
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
            className={`w-full px-4 py-3 rounded-lg border-2 ${
              errors.message
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-blue-600 focus:ring-blue-600/20'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 transition-all duration-200 outline-none resize-none`}
            placeholder="Tell us about your challenges, goals, or specific interests..."
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.message}
            </p>
          )}
        </div>

        {/* API Error Message */}
        {apiError && (
          <div 
            role="alert"
            aria-live="assertive"
            className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <p className="text-sm text-red-800 dark:text-red-300">{apiError}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : ctaLabel}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          By submitting this form, you agree to our privacy policy. We'll never share
          your information.
        </p>
      </form>
    </div>
  );
};
