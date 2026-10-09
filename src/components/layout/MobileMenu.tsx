import type { ReactNode } from 'react';
import { SheetContent, SheetTitle, SheetDescription } from '../ui/sheet';
export function MobileMenu({children}:{children:ReactNode}) { return <SheetContent className="mobile-menu" data-lenis-prevent><SheetTitle>Explore our community</SheetTitle><SheetDescription>Find events, meet the crew and get in touch with GDG on Campus IBA.</SheetDescription>{children}</SheetContent>; }
