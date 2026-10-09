import { readFile, access, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { publicRoutes } from '../src/lib/seo.ts';
const failures: string[]=[];
const pages = new Map<string,string>();
for (const route of [...publicRoutes,'/404']) {
  pages.set(route,await readFile(route==='/404'?join('dist','404.html'):join('dist',route.slice(1),'index.html'),'utf8'));
}
const attrs=(tag:string)=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match=>[match[1],match[2]]));
let checkedLinks=0;
for (const [route,html] of pages) {
  const fail=(message:string)=>failures.push(`${route}: ${message}`);
  if((html.match(/<h1[\s>]/g)??[]).length!==1)fail('expected exactly one H1');
  if(!/<title>[^<]+<\/title>/.test(html))fail('missing title');
  for(const name of ['description','og:title','og:image','og:url','twitter:card'])if(!html.includes(`="${name}"`))fail(`missing ${name}`);
  if(!html.includes('rel="canonical"'))fail('missing canonical');
  if(!html.includes('This chapter is not an official Google site.'))fail('missing disclaimer');
  for(const tag of html.matchAll(/<img\b[^>]*>/g))if(!('alt' in attrs(tag[0])))fail('image without alt');
  for(const tag of html.matchAll(/<a\b[^>]*>/g)) {
    const {href,target,rel}=attrs(tag[0]); if(!href)continue; checkedLinks++;
    if(target==='_blank'&&(!rel?.split(' ').includes('noopener')||!rel?.split(' ').includes('noreferrer')))fail(`unsafe external link ${href}`);
    if(!href.startsWith('/')&&!href.startsWith('#'))continue;
    const url=new URL(href,'https://example.com'+route);
    const targetRoute=url.pathname.replace(/\/$/,'')||'/';
    const targetHtml=pages.get(targetRoute);
    if(!targetHtml){fail(`unknown page ${href}`);continue;}
    if(url.hash&&!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))fail(`missing anchor ${href}`);
  }
  for(const tag of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs))try{JSON.parse(tag[1])}catch{fail('invalid JSON-LD')}
}
const sitemap=await readFile('dist/sitemap-0.xml','utf8');
if(sitemap.includes('/dev/')||sitemap.includes('/404'))failures.push('Sitemap contains excluded routes');
for(const route of publicRoutes)if(!sitemap.includes(route==='/'?'</loc>':`${route}/</loc>`))failures.push(`Sitemap missing ${route}`);
await access('dist/robots.txt');await access('dist/brand/social-card.png');
const report={pages:pages.size,checkedLinks,failures};
await writeFile('.astro/site-audit.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
