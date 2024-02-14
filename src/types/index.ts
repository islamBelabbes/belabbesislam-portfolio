export type TODO = any; // this is placeholder type

export type TDashboardMenuItems = {
  name: string;
  href: string;
  icon: JSX.Element;
  subMenu?: TDashboardMenuItems[] | null;
};

export type TProject = {
  title: string;
  description: string;
  technologies: TCategory[];
  url: string;
  image: string;
};

export type TCategory = {
  id: string;
  name: string;
  image: string;
};
