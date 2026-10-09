import { site, confirmedExternalUrl } from '../data/site.ts';
import type { EventRecord } from './events.ts';

export const publicRoutes = ['/', '/events', '/speakers', '/team', '/gallery', '/our-story', '/contact'] as const;
export function canonicalUrl(path: string, origin: string): string {
  const url = new URL(path, origin);
  url.search = ''; url.hash = '';
  url.pathname = url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '');
  return url.href;
}
export function organizationSchema(origin: string) {
  return {
    '@context': 'https://schema.org', '@type': 'Organization',
    '@id': new URL('/#organization', origin).href, name: site.name,
    alternateName: site.shortName, url: new URL('/', origin).href,
    logo: new URL('/brand/logo-horizontal-light.svg', origin).href,
    description: site.description,
    ...(site.contact.email ? {email: site.contact.email} : {}),
    ...(site.socials.length ? {sameAs: site.socials.map(link => confirmedExternalUrl(link.href)).filter(Boolean)} : {}),
  };
}
/** Samples are never advertised as real searchable events. */
export function eventSchema(event: EventRecord, origin: string) {
  if (event.sample) return undefined;
  const online = event.mode === 'online';
  const destination = confirmedExternalUrl(event.registerUrl);
  // Online listings need their confirmed virtual location, not a guessed URL.
  const virtualLocation = confirmedExternalUrl(event.location);
  if (online && !virtualLocation) return undefined;
  return {
    '@context': 'https://schema.org', '@type': 'Event', name: event.title,
    description: event.description, startDate: event.date,
    ...(event.endDate ? {endDate: event.endDate} : {}),
    url: new URL(`/events?event=${encodeURIComponent(event.slug)}`, origin).href,
    image: [new URL(event.cover, origin).href],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: `https://schema.org/${online ? 'Online' : event.mode === 'hybrid' ? 'Mixed' : 'Offline'}EventAttendanceMode`,
    location: online ? {'@type': 'VirtualLocation', url: virtualLocation} : {'@type': 'Place', name: event.location, address: event.location},
    organizer: {'@type': 'Organization', name: site.name, url: new URL('/', origin).href},
    ...(destination ? {potentialAction: {'@type': 'RegisterAction', target: destination}} : {}),
  };
}
/** Prevent content from closing an inline JSON-LD script. */
export function serializeSchema(value: unknown): string { return JSON.stringify(value).replace(/</g, '\\u003c'); }
