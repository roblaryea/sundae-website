import { callBackend, type BookingContext, type BookingConfirmation } from './sundaeBookingClient';

export interface PersonalBookingContext extends BookingContext {
  slug?: string;
  displayName: string;
  headline: string;
  bio: string;
  formToken?: string;
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
