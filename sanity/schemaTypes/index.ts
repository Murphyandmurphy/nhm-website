import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { servicesPage } from "./servicesPage";
import { service } from "./service";
import { aboutPage } from "./aboutPage";
import { insightsPage } from "./insightsPage";
import { post } from "./post";
import { contactPage } from "./contactPage";
import { testimonial } from "./testimonial";
import { page } from "./page";
import { blockTypes } from "./blocks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons / fixed pages
    siteSettings,
    homePage,
    servicesPage,
    service,
    aboutPage,
    insightsPage,
    post,
    contactPage,
    testimonial,
    // Page builder
    page,
    ...blockTypes,
  ],
};
