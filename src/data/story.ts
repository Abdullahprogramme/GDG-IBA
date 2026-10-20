/** Add origin details only after the chapter has confirmed them. */
export interface ChapterOrigin {
  foundedYear: number | null;
  history: string | null;
  photo: { src: string; alt: string } | null;
}
export const chapterOrigin: ChapterOrigin = { foundedYear: 2019, history: "GDG on Campus IBA was founded in 2019 with the goal of bringing together developers and technology enthusiasts in the IBA community.", photo: { src: "/public/images/orientation2019.jpg", alt: "GDG on Campus IBA orientation in 2019" } };
