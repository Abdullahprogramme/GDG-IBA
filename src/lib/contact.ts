import { z } from 'zod';
export const contactSubjects=[{value:'general',label:'General'},{value:'partnership',label:'Partnership / Sponsorship'},{value:'speaker',label:'Become a Speaker'},{value:'team',label:'Join the Team'},{value:'other',label:'Other'}] as const;
export const contactSchema=z.object({name:z.string().trim().min(2,'Please enter at least 2 characters.').max(100,'Keep your name within 100 characters.'),email:z.string().trim().email('Please enter a valid email address.').max(254),subject:z.enum(['general','partnership','speaker','team','other']),message:z.string().trim().min(20,'Please write at least 20 characters.').max(5000,'Keep your message within 5,000 characters.'),botcheck:z.string()});
export type ContactValues=z.infer<typeof contactSchema>;
export function contactSubject(value:string|null){return contactSubjects.find(item=>item.value===value)?.value??'general'}
export function configuredFormKey(value:string|undefined){const key=value?.trim()??'';return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key)?key:undefined}
export async function sendContact(values:ContactValues,accessKey:string|undefined,request:typeof fetch=fetch):Promise<'sent'|'spam'>{
 if(values.botcheck)return 'spam';
 const data=contactSchema.parse(values),key=configuredFormKey(accessKey);if(!key)throw new Error('The message form is not available yet. Please try again later.');
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
 try{const response=await request('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:controller.signal,body:JSON.stringify({access_key:key,name:data.name,email:data.email,subject:`GDG on Campus IBA — ${contactSubjects.find(s=>s.value===data.subject)!.label}`,message:data.message,botcheck:false,from_name:'GDG on Campus IBA website'})});const result:unknown=await response.json();if(!response.ok||!result||typeof result!=='object'||!('success'in result)||result.success!==true)throw new Error('Your message could not be sent. Please try again.');return 'sent';}finally{clearTimeout(timeout)}
}
export function mapEmbedUrl(value:string|null|undefined){if(!value)return undefined;try{const url=new URL(value);return url.protocol==='https:'&&['www.google.com','maps.google.com'].includes(url.hostname)&&url.pathname.startsWith('/maps/embed')?url.href:undefined}catch{return undefined}}
