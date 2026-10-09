/** Add origin details only after the chapter has confirmed them. */
export interface ChapterOrigin {
  foundedYear: number | null;
  history: string | null;
  photo: { src: string; alt: string } | null;
}
export const chapterOrigin: ChapterOrigin = { foundedYear: null, history: null, photo: null };
