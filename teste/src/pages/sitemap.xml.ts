import type { APIRoute } from 'astro';
import { servicePages } from '../data/service-pages';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  if (!site) return new Response('Site URL ausente', { status: 500 });
  const paths = ['/', ...servicePages.map((page) => `/${page.slug}/`)];
  const entries = paths.map((path) => `  <url><loc>${new URL(path, site).toString()}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
