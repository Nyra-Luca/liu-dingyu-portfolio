import { getProjectById, projects } from "./projects.js";

export const SITE_URL = "https://liu-dingyu-portfolio.pages.dev";
export const SITE_NAME = "Liu Dingyu Portfolio";

const defaultSeo = {
  title: "刘丁瑜｜室内设计与景观设计作品集",
  description:
    "刘丁瑜环境设计个人作品集，涵盖室内设计、景观设计、商业空间、居住空间与城市公共环境设计。",
  image: "/images/home-background.jpg",
  imageAlt: "刘丁瑜环境设计作品集首页",
  type: "website",
};

const pageSeo = {
  "/": defaultSeo,
  "/interior": {
    title: "室内设计作品｜刘丁瑜作品集",
    description:
      "刘丁瑜室内设计作品集，包含商业空间、居住空间、零售体验与品牌空间设计项目。",
    image: "/images/interior-background.jpg",
    imageAlt: "刘丁瑜室内设计作品集",
    type: "website",
  },
  "/landscape": {
    title: "景观设计作品｜刘丁瑜作品集",
    description:
      "刘丁瑜景观设计作品集，包含城市更新、滨水空间、口袋公园与历史街道改造项目。",
    image: "/images/landscape-background.jpg",
    imageAlt: "刘丁瑜景观设计作品集",
    type: "website",
  },
  "/about": {
    title: "关于刘丁瑜｜环境设计个人简历",
    description:
      "刘丁瑜的教育背景、设计能力、实习经历、项目经验与联系方式。",
    image: "/images/home-background.jpg",
    imageAlt: "刘丁瑜环境设计个人简历",
    type: "profile",
  },
  "/contact": {
    title: "联系刘丁瑜｜环境设计作品集",
    description: "联系刘丁瑜，进行作品集评审、设计合作或项目交流。",
    image: "/images/home-background.jpg",
    imageAlt: "刘丁瑜环境设计作品集联系页面",
    type: "website",
  },
};

export const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
};

export function getSeoForPath(pathname) {
  const path = normalizePath(pathname);

  if (pageSeo[path]) {
    return createSeo(path, pageSeo[path]);
  }

  if (path.startsWith("/projects/")) {
    const projectId = path.slice("/projects/".length);
    const project = getProjectById(projectId);

    if (project) {
      return createSeo(path, {
        title: `${project.title}｜刘丁瑜作品集`,
        description: project.summary,
        image: project.coverImage,
        imageAlt: `${project.title}项目封面`,
        type: "article",
      });
    }
  }

  return createSeo(path, defaultSeo);
}

function createSeo(path, metadata) {
  return {
    ...metadata,
    canonical: `${SITE_URL}${path === "/" ? "/" : path}`,
    imageUrl: new URL(metadata.image, SITE_URL).href,
    siteName: SITE_NAME,
  };
}

export const SEO_ROUTES = [
  "/",
  "/interior",
  "/landscape",
  "/about",
  "/contact",
  ...projects.map((project) => `/projects/${project.id}`),
];
