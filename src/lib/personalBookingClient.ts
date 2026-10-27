import { callBackend, type BookingContext, type BookingConfirmation } from './sundaeBookingClient';

export interface PersonalBookingContext extends BookingContext {
  slug?: string;
  displayName: string;
  headline: string;
  bio: string;
  formToken?: string;
  /** Mailbox the verification and confirmation mail is sent from; absent on older backends. */
  senderEmail?: string | null;
  events?: { id: string; name: string; durationMinutes: number; durationOptions: number[] }[];
  confirmation?: BookingConfirmation;
}
export async function fetchPersonalContext(slug: string, eventType?: string) {
  const params = new URLSearchParams();
  if (eventType) params.set('eventType', eventType);
  return callBackend<PersonalBookingContext>(`/api/v1/public/scheduling/${encodeURIComponent(slug)}/context?${params}`);
}
export async function fetchManagedPersonalContext(id: string, token: string) {
  return callBackend<PersonalBookingContext>(`/api/v1/public/scheduling/manage/${encodeURIComponent(id)}/context?${new URLSearchParams({ token })}`);
}

/** The host's approval page. The token is the credential; reading the request changes nothing. */
export interface PersonalBookingRequestDetails {
  status: string;
  displayName: string;
  visitor?: { name: string; email: string };
  slot?: { startUtc: string; label: string };
  timezone?: string;
  eventTypeName?: string;
  durationMinutes?: number;
  discussion?: string | null;
  expiresAt?: string | null;
}
export async function fetchRequestDetails(id: string, token: string) {
  return callBackend<PersonalBookingRequestDetails>(`/api/v1/public/scheduling/requests/${encodeURIComponent(id)}/details?${new URLSearchParams({ token })}`);
}
