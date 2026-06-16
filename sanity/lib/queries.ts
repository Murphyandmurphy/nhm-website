import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  brandName, tagline, email, phone, linkedinUrl,
  navCtaLabel, navCtaHref,
  "navItems": navItems[]{ label, "href": coalesce(customHref, "/" + page->slug.current) },
  "footerLinks": footerLinks[]{ label, "href": coalesce(customHref, "/" + page->slug.current) }
}`;

export const homePageQuery = groq`{
  "page": *[_type == "homePage"][0],
  "services": *[_type == "service"] | order(order asc){
    icon, number, title, shortDescription
  },
  "testimonials": *[_type == "testimonial"] | order(order asc){
    quote, name, role
  }
}`;

export const servicesPageQuery = groq`{
  "page": *[_type == "servicesPage"][0],
  "services": *[_type == "service"] | order(order asc){
    "id": _id, order, icon, number, title, need, solution, items, ctaLabel
  }
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroEyebrow, heroTitle, heroBody, heroImage,
  storyBody,
  brandsEyebrow, brandsTitle, brandsLead, brands, brandsNote,
  approachEyebrow, approachTitle, approach,
  ctaTitle, ctaBody, ctaLabel
}`;

export const insightsPageQuery = groq`{
  "page": *[_type == "insightsPage"][0],
  "posts": *[_type == "post"] | order(date desc){
    title, "slug": slug.current, category, excerpt, date, coverImage
  }
}`;

export const contactPageQuery = groq`{
  "page": *[_type == "contactPage"][0],
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
