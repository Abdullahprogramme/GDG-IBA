import { useEffect } from 'react';
import { animate, stagger } from 'motion';
import { Marquee } from '../motion/Marquee';
import { LanyardStrip } from '../shapes';
import { useMotionPreference } from '../motion/useMotionPreference';
export function FooterMotion(){const reduced=useMotionPreference();useEffect(()=>{const root=document.querySelector<HTMLElement>('.site-footer');if(!root)return;let played=false;let animation:ReturnType<typeof animate>|undefined;const observer=new IntersectionObserver(([entry])=>{root.dataset.visible=String(entry.isIntersecting);if(entry.isIntersecting&&!played){played=true;animation=animate(root.querySelectorAll('.footer-column'),{opacity:[0,1],y:reduced?[0,0]:[24,0]},{duration:.5,delay:stagger(reduced?0:.08)});}},{threshold:.1});observer.observe(root);return()=>{observer.disconnect();animation?.stop();};},[reduced]);return null;}
export function FooterBand(){return <Marquee label="decorative community pattern" speed={40} className="footer-band"><LanyardStrip repeats={3}/></Marquee>;}
