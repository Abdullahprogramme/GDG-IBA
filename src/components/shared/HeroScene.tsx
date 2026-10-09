import { FloatingShape } from '../motion/FloatingShape';
import { Globe, TripleCircle, Slashes, People, Quote, Asterisk, type ThemeName } from '../shapes';
import { Camera } from '../shapes/Camera';
import { Brace, Arrow } from '../shapes';
export function HeroTitle({title,emphasis}:{title:string;emphasis:string}){return <h1 className="page-hero-title" style={{overflow:"hidden"}}>{title.split(' ').map((word,i)=><span key={`${word}-${i}`} style={{display:'inline-block',animationDelay:`${i*.06}s`}}>{word===emphasis?<strong>{word}</strong>:word}{'\u00a0'}</span>)}</h1>;}
export type HeroShapeName = 'globe' | 'triple-circle' | 'slashes' | 'people' | 'quote' | 'asterisk' | 'camera' | 'brace' | 'arrow';
const shapeComponents = { globe: Globe, 'triple-circle': TripleCircle, slashes: Slashes, people: People, quote: Quote, asterisk: Asterisk, camera: Camera, brace: Brace, arrow: Arrow };
export function HeroShapes({theme,shapes=['globe','triple-circle','slashes']}:{theme:ThemeName;shapes?:HeroShapeName[]}){return <div className="page-hero-shapes">{shapes.slice(0,3).map((name,i)=>{const Shape=shapeComponents[name];return <FloatingShape key={`${name}-${i}`} rotate={name!=='globe'} duration={7+i}><Shape theme={theme} width={i===0?140:100} height={i===0?140:100}/></FloatingShape>;})}</div>;}
