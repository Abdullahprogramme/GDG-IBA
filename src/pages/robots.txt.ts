import type { APIRoute } from 'astro';
export const GET: APIRoute = ({site}) => {
  const origin = site ?? new URL('http://localhost:4321');
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname);
  const indexable = process.env.SITE_INDEXING === 'true' && !local;
  return new Response(`User-agent: *\n${!indexable ? 'Disallow: /' : 'Allow: /\nDisallow: /dev/\nDisallow: /404\nDisallow: /404.html'}\nSitemap: ${new URL('/sitemap-index.xml', origin)}\n`, {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
};
