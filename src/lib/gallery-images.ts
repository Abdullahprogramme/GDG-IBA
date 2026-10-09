import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { GalleryRecord } from './gallery';
const images=import.meta.glob<{default:ImageMetadata}>('../assets/**/*.{png,jpg,jpeg,webp,avif}',{eager:true});
const sizes='(min-width:1440px) 22vw, (min-width:1024px) 30vw, (min-width:768px) 44vw, 90vw';
export const galleryImageSizes=sizes;
/** Repository assets are optimized at build time. Public SVGs retain their vector quality. */
export async function prepareGalleryImage(photo:GalleryRecord):Promise<GalleryRecord>{
 const key=photo.src.replace(/^\/src\//,'../');const image=images[key]?.default;
 if(!image)return {...photo,fullSrc:photo.src};
 const widths=[...new Set([320,480,800,1200].map(width=>Math.min(width,image.width)))];
 const [avif,webp,blur,full]=await Promise.all([
  getImage({src:image,widths,format:'avif',quality:65}),getImage({src:image,widths,format:'webp',quality:80}),
  getImage({src:image,width:24,format:'webp',quality:25}),getImage({src:image,width:Math.min(1800,image.width),format:'webp',quality:85})
 ]);
 return {...photo,src:webp.src,width:image.width,height:image.height,avifSrcSet:avif.srcSet.attribute,webpSrcSet:webp.srcSet.attribute,placeholder:blur.src,fullSrc:full.src};
}
