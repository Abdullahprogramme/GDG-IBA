import { useMotionValue, useSpring, motion } from "motion/react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGithub, FaYoutube } from "react-icons/fa";
import { useMotionPreference } from "../motion/useMotionPreference";
import { confirmedExternalUrl } from "../../data/site";
import type { SocialLink } from "../shared/social-types";
const icons = { instagram: FaInstagram, facebook: FaFacebookF, linkedin: FaLinkedinIn, github: FaGithub, youtube: FaYoutube };
export function SocialTile({ link }: { link: SocialLink }) {
  const x = useMotionValue(0), y = useMotionValue(0), reduced = useMotionPreference();
  const rotateX = useSpring(x, { stiffness: 200, damping: 20 }), rotateY = useSpring(y, { stiffness: 200, damping: 20 });
  const href = confirmedExternalUrl(link.href), Icon = link.platform === "community" ? undefined : icons[link.platform];
  if (!href) return null;
  return <motion.a className={`social-tile social-tile--${link.platform}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} (opens in a new tab)`} style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }} onPointerMove={event => { if (reduced || event.pointerType !== "mouse") return; const rect = event.currentTarget.getBoundingClientRect(); x.set((.5 - (event.clientY - rect.top) / rect.height) * 12); y.set(((event.clientX - rect.left) / rect.width - .5) * 12); }} onPointerLeave={() => { x.set(0); y.set(0); }} onBlur={() => { x.set(0); y.set(0); }}>{Icon ? <Icon size={30}/> : <img className="social-tile__community-mark" src="/brand/mark-dark.svg" alt=""/>}<span><strong>{link.platform === "community" ? "GDG on Campus" : link.platform}</strong><small>{link.label}</small></span><span aria-hidden="true">↗</span></motion.a>;
}
