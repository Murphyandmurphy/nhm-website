import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  brandName, tagline, email, phone, linkedinUrl,
  navCtaLabel, navCtaHref,
  "navItems": navItems[]{ label, "href": coalesce(customHref, "/" + page->slug.current) },
  "footerLinks": footerLinks[]{ label, "href": coalesce(customHref, "/" + page->slug.current) }
}`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  "sections": sections[]{ ... }
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  "sections": sections[]{ ... }
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  "sections": sections[]{ ... }
}`;

export const insightsPageQuery = groq`{
  "page": *[_type == "insightsPage"][0],
  "posts": *[_type == "post"] | order(date desc){
    title, "slug": slug.current, category, excerpt, date, coverImage
  }
}`;

export const contactPageQuery = groq`{
  "sections": *[_type == "contactPage"][0].sections[]{ ... },
  "settings": *[_type == "siteSettings"][0]{ email, phone, linkedinUrl }
}`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title, category, date, excerpt, coverImage, body
}`;

/* ---- Page builder ---- */
export const pageSlugsQuery = groq`*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "sections": sections[]{ ... }
}`;
