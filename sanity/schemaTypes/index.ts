import { type SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { homePage } from "./homePage";
import { servicesPage } from "./servicesPage";
import { aboutPage } from "./aboutPage";
import { insightsPage } from "./insightsPage";
import { post } from "./post";
import { contactPage } from "./contactPage";
import { page } from "./page";
import { blockTypes } from "./blocks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons / fixed pages
    siteSettings,
    homePage,
    servicesPage,
    aboutPage,
    insightsPage,
    post,
    contactPage,
    // Page builder
    page,
    ...blockTypes,
  ],
};
