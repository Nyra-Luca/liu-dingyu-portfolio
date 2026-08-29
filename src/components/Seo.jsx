import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoForPath } from "../data/seo.js";

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}

function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    let canonical = document.head.querySelector('link[rel="canonical"]');

    document.documentElement.lang = "zh-CN";
    document.title = seo.title;

    setMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    setMeta('meta[name="robots"]', {
      name: "robots",
      content: "index, follow",
    });
    setMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "zh_CN",
    });
    setMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: seo.siteName,
    });
    setMeta('meta[property="og:type"]', {
      property: "og:type",
      content: seo.type,
    });
    setMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title,
    });
    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    setMeta('meta[property="og:url"]', {
      property: "og:url",
      content: seo.canonical,
    });
    setMeta('meta[property="og:image"]', {
      property: "og:image",
      content: seo.imageUrl,
    });
    setMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: seo.imageAlt,
    });
    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.title,
    });
    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    setMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: seo.imageUrl,
    });

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;
  }, [pathname]);

  return null;
}

export default Seo;
