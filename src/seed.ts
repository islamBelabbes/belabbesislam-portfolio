import { Category } from "./dto/categories";
import { Project } from "./dto/projects";

type CleanCategory = Omit<Category, "createdAt">;
type CleanProject = Omit<Project, "createdAt" | "categories">;

export const categories: CleanCategory[] = [
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

export const projects: (CleanProject & { categories: CleanCategory[] })[] = [
  {
    id: 0,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
    gallery: [],
    github: "",
  },
  {
    id: 1,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
    gallery: [],
    github: "",
  },
  {
    id: 2,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
    gallery: [],
    github: "",
  },
  {
    id: 3,
    title: "wahaj",
    description: "suida arabia based learning platform",
    image: "/project.png",
    categories: categories,
    url: "https://wahaj.co/",
    gallery: [],
    github: "",
  },
];
