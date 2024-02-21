import { tryCatch } from "./lib/utils";
import { TCategory, TProject } from "./types";

export const categories: TCategory[] = [
  {
    id: 0,
    image: "/icon-tailwindcss.png",
    name: "tailwindcss",
  },
  {
    id: 1,
    image: "/icon-nextjs.png",
    name: "nextjs",
  },
  {
    id: 2,
    image: "/icon-wordpress.png",
    name: "wordpress",
  },
  {
    id: 3,
    image: "/icon-woo.png",
    name: "woocommerce",
  },
];

export const projects: TProject[] = [
  {
    id: 0,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
  },
  {
    id: 1,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
  },
  {
    id: 2,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
  },
  {
    id: 3,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
  },
];
