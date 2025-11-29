'use client';

import React, { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';

interface LeadCaptureFormProps {
  ctaLabel: string;
  defaultMessage?: string;
  className?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  ctaLabel,
  defaultMessage = '',
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    message: defaultMessage,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Get source page
      const sourcePage = window.location.pathname;

      // Parse UTM parameters
      const searchParams = new URLSearchParams(window.location.search);
      const utmSource = searchParams.get('utm_source') || undefined;
      const utmMedium = searchParams.get('utm_medium') || undefined;
      const utmCampaign = searchParams.get('utm_campaign') || undefined;

      // Submit to API
      const response = await fetch('/api/cta/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
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

      // Success
      setIsSuccess(true);
    } catch (err) {
      setError(
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name - Required */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 outline-none"
            placeholder="John Doe"
          />
        </div>

        {/* Email - Required */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 outline-none"
            placeholder="john@company.com"
          />
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 outline-none"
            placeholder="Your Company"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 outline-none"
            placeholder="CEO, Operations Manager, etc."
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 transition-all duration-200 outline-none resize-none"
            placeholder="Tell us about your needs..."
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
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
