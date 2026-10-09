import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { MobileMenu } from './MobileMenu';
import { Menu } from 'lucide-react';
import { LogoLockup } from '../shared/LogoLockup';
import { Sheet, SheetTrigger } from '../ui/sheet';
import { site, activeNavHref, confirmedExternalUrl, homeSectionRoutes, navigationHref } from '../../data/site';
import { MagneticButton } from '../motion/MagneticButton';
import { useMotionPreference } from '../motion/useMotionPreference';
import type { ThemeName } from '../shapes';
import './shell.css';
export function Navbar({ pathname, theme = 'yellow' }: { pathname: string; theme?: ThemeName }) {
 const [open,setOpen]=useState(false),[hidden,setHidden]=useState(false);
 const [mounted,setMounted]=useState(false),[hash,setHash]=useState('');
 useEffect(() => {
   setMounted(true);
   let frame = 0;
   const sections = Object.keys(homeSectionRoutes).map(hash => document.getElementById(hash.slice(1))).filter((element): element is HTMLElement => !!element);
   const update = () => {
     frame = 0;
     if (pathname !== '/') return;
     const current = sections.filter(section => section.getBoundingClientRect().top <= Math.min(260, innerHeight * .3)).at(-1);
     setHash(current ? `#${current.id}` : '');
   };
   const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
   const onHash = () => setHash(location.hash);
   update();
   window.addEventListener('scroll', onScroll, { passive: true });
   window.addEventListener('hashchange', onHash);
   return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('hashchange', onHash); };
 }, [pathname]);
 const ref=useRef<HTMLElement>(null),last=useRef(0),reduced=useMotionPreference();
 const {scrollY}=useScroll(); const active=activeNavHref(pathname,hash),join=confirmedExternalUrl(site.communityUrl);
 useMotionValueEvent(scrollY,'change',value=>{const delta=value-last.current;if(value<80||open||ref.current?.contains(document.activeElement))setHidden(false);else if(Math.abs(delta)>6)setHidden(delta>0);if(Math.abs(delta)>6)last.current=value;});
 const links=(mobile=false)=>site.nav.map((item,i)=>{const href=navigationHref(item);return <motion.div key={item.href} initial={mobile&&!reduced?{opacity:0,y:30}:false} animate={{opacity:1,y:0}} transition={{delay:reduced?0:i*.06}}>{href?<a className={mobile?`mobile-link palette-${i%4}`:'nav-link'} href={href} aria-current={active===item.href?'page':undefined} onClick={()=>setOpen(false)}>{!mobile&&active===item.href&&<motion.span className="nav-active" layoutId="nav-pill" transition={{type:"spring",stiffness:260,damping:24}}/>}{item.label}</a>:<span className={mobile?`mobile-link palette-${i%4}`:'nav-link'} aria-disabled="true" title="Coming soon">{item.label}</span>}</motion.div>;});
 const joinButton=join?<a className="join-button" href={join} target="_blank" rel="noopener noreferrer">Join Us ↗</a>:<button className="join-button" disabled title="Registration link coming soon">Join Us</button>;
 const sectionThemes: Record<string, ThemeName> = { '#about':'blue', '#crew':'pink', '#events':'yellow', '#voices':'blue', '#gallery':'green', '#join':'pink' };
 return <motion.header ref={ref} className={`site-navbar theme-${pathname==='/' ? sectionThemes[hash] ?? theme : theme}`} initial={false} animate={{y:!mounted&&!reduced?-80:hidden&&!open?-100:0,opacity:!mounted&&!reduced?0:1}} transition={reduced?{duration:0}:{type:'spring',stiffness:260,damping:24}} onFocusCapture={()=>setHidden(false)}>
 <a href="/" className="navbar-logo" aria-label={`${site.shortName} home`}><span className="logo-full"><LogoLockup/></span><span className="logo-compact"><LogoLockup compact/></span></a>
 <nav className="desktop-nav" aria-label="Main navigation">{links()}</nav><MagneticButton>{joinButton}</MagneticButton>
 <div className="mobile-nav"><Sheet open={open} onOpenChange={setOpen}><SheetTrigger render={<button className="menu-trigger" aria-label="Open navigation"/>}><Menu size={22}/></SheetTrigger><MobileMenu><nav aria-label="Mobile navigation">{links(true)}</nav>{site.socials.map(link=>confirmedExternalUrl(link.href)&&<a key={link.platform} href={link.href} target="_blank" rel="noopener noreferrer">{link.platform}</a>)}{joinButton}</MobileMenu></Sheet></div>
 </motion.header>;
}
